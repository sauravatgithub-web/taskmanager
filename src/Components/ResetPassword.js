import React, {useState} from 'react'
// import './ResetPassword.css'
import { useNavigate } from 'react-router-dom'
import forget from './Images/forget.png'

const ResetPassword = () => {
    const [credentials, setCredentials] = useState({email : "", token : "", password : ""});
    const navigate = useNavigate();
    const host = "http://localhost:5000";

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/resetPassword`, {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                email : credentials.email,
                token : credentials.token,
                password : credentials.password
            })
        })

        let json = await response.json();
        console.log(json);
        if(json.success) {
            navigate('/login');
        }
        else {
            alert("Some error occured.");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }

    return (
        <div className = "page-rp">
            <div className = "form-rp">
                <div id = "firstText-rp">Set your new password</div><br/>
                <form className = "login-rp" onSubmit = {handleSubmit}>
                    <div className = "form-item-rp">
                        <label htmlFor='email' className = "label">Email </label><br/>
                        <input className = "form-element-rp" type = "email" name = "email" id = "email-value" required autoComplete = "true" placeholder='Enter your email...' width = "400px" onChange = {onChange}></input>
                    </div>
                    <div className = "form-item-rp">
                        <label htmlFor='token' className = "label">OTP </label><br/>
                        <input className = "form-element-rp" type = "text" name = "token" id = "token-value" required autoComplete = "true" placeholder='Enter OTP...' width = "400px" onChange = {onChange}></input>
                    </div>
                    <div className = "form-item-rp">
                        <label htmlFor='password' className = "label">New Password </label><br/>
                        <input className = "form-element-rp" type = "password" name = "password" id = "password-value" required autoComplete = "true" placeholder='Enter new password...' width = "400px" onChange = {onChange}></input>
                    </div>
                    <button type="submit" className ="Submit-rp">Reset my Password</button>
                </form>
            </div>
            <div className = "image-rp">
                <img src = {forget} alt = "video" height = "370px"/>
            </div>
        </div>
    )
}

export default ResetPassword
