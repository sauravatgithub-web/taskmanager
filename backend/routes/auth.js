const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleWare/fetchUser');

const JWT_SECRET = "task_schema745@gmail";

router.use(express.json());
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
        console.log({errors: errors.array()});
        return res.status(400).json({success, errors: errors.array()});
    }

    // check whether user with same email exists earlier
    try {
        let user = await User.findOne({email : req.body.email});
        if(user) {
            success = false;
            console.log("User already exists.");
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
        res.status(500).send(success, "Some error occured.");
    }
})

module.exports = router;