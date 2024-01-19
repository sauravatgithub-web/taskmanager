const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fetchUser = require('../middleWare/fetchUser');
const SMTPConnection = require('nodemailer/lib/smtp-connection');

const JWT_SECRET = "task_schema745@gmail";

router.use(express.json());
router.use(bodyParser.json());
let success;

// Route 1: Create a user using: POST "api/auth/"
router.post('/createUser', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be atleast 5 characters long').isLength({min : 5})
], 
async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array()});
    }

    // check whether user with same email exists earlier
    try {
        let user = await User.findOne({email : req.body.email});
        if(user) {
            success = false;
            return res.status(400).json({success, error : "User already exists."});
        }
        else {
            // encrypt the password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //create a new user
            const newUser = await User.create({
                name:  req.body.name,
                email: req.body.email,
                password: secPass
            });
            console.log(`New user with email: ${req.body.email} created successfully.`);

            const data = {
                user: {
                    id: newUser.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            return res.json({success, message: "User created successfully", user: newUser, authToken: authToken});
        }
    }
    catch (error) {
        console.log(error);
        success = false;
        res.status(500).send(success, "Some unexpected error occured at server.");
    }
})

// Route 2 : Authenticate a user using: POST "/api/auth/login". No login required
router.post('/userLogin', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter correct password').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        return res.status(400).send({success, errors : errors.array()});
    }

    // check if email exists in database
    try {
        let user = await User.findOne({email : req.body.email});
        if(!user) {
            success = false;
            console.log("Email not found");
            return res.status(400).send({success, message : "Credentials unmatched"});
        }
        else {
            let passwordCheck = await bcrypt.compare(req.body.password, user.password);
            if(!passwordCheck) {
                success = false;
                console.log("Password unmatched.");
                return res.status(400).send({success, message : "Credentials unmatched"});
            }
            else {
                const data = {
                    user: {
                        id : user.id
                    }
                }

                const userAuthToken = jwt.sign(data, JWT_SECRET);
                success = true;
                res.json({success, authToken : userAuthToken});
            }
        }
    }
    catch (error) {
        console.log(error);
        success = false;
        return res.status(500).send(success, "Some unexpected error occured at server.");
    }
})

// Route 3: Forget password using POST request. no login required
const passwordResetTokens = {};

// create a transporter for sending email
const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth : {
        user : "sauravkumarsing2004@gmail.com",
        pass : "oclm yubv zsjf xnrd"
    }
});

// function to send a reset password
const sendResetEmail = (email, sharedToken) => {
    const mailOptions = {
        from : "sauravkumarsing2004@gmail.com",
        to : email,
        subject : 'Password reset',
        text: `Your OTP is: ${sharedToken}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.error('Error sending password reset email:', error);
        }
        else {
            console.log('Password reset email sent:', info.response);
        }
    })
}

router.post('/forgetPassword', [
    body('email', "Enter a valid mail").isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        return res.status(400).send({success, errors : errors.array()});
    }

    try {
        const user = User.findOne({email : req.body.email});
        if(!user) {
            success = false;
            console.log("Enter a valid email id.");
            res.status(400).send({success, message : "Email not found"});
        }
        else {
            // generate a unique token and associate with user email
            const token = crypto.randomBytes(4).toString('hex');
            const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
            passwordResetTokens[req.body.email] = { token, expirationTime };

            // Send an email with the reset link
            const sharedToken = `${token}`;
            sendResetEmail(req.body.email, sharedToken);

            res.json({ success: true, message: 'Password reset email sent.' });
        }
    }
    catch (error) {
        success = false;
        console.log(error);
        res.status(500).send({success, message : "Internal server error"});
    }
})

//Route 4: Reseting password
router.post('/resetPassword', [
    body('email', 'Enter valid email').isEmail(),
    body('token', 'Enter a valid token').isLength({min : 1}),
    body('password', 'It must be 6 characters long').isLength({min : 5})
], async(req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        res.status(400).send({success, errors : errors.array()});
    }
    else {
        try {
            const {email, token, password} = req.body;
            
            // verify the token
            const storedToken = passwordResetTokens[email];
            if(storedToken && storedToken.token == token && Date.now() < storedToken.expirationTime) {
                let user = await User.findOne({email : email});
                // encrypt the password
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(password, salt);
                user.password = secPass;
                await user.save();
                delete passwordResetTokens[email];

                success = true;
                console.log("Password has been reset.");
                return res.json({success : success, message : "Password has been reset.", user : user});
            }
            else {
                success = false;
                return res.json({success, message : "Token do not match"});
            }
        }
        catch(error) {
            console.log(error);
            success = false;
            res.status(500).send({success, message : "Internal server error in resetting password"});
        }
    }
})

module.exports = router;