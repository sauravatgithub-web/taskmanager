import "./Forget.css"
import React, {useState} from 'react'
import forget from './Images/forget.png'
import { Link, useNavigate } from 'react-router-dom'

const ForgetPage = () => {
    const [value, setValue] = useState({email : ""});
    const navigate = useNavigate();

    const host = "http://localhost:5000";

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/forgetPassword`, {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({email : value.email})
        })
        const json = await response.json();
        console.log(json);
        if(json.success) {
            navigate("/resetPassword"); 
        }
        else {
            alert("Invalid credentials..");
        }
    }

    const onChange = (e) => {
        setValue({...value, [e.target.name] : e.target.value});
    }

    return (
        <div className = "page-login">
            <div className = "form-login">
                <div id = "firstText-login">Forgot your password?</div><br/>
                <p className = "state">To reset your password, please enter the email address of your Task Manager account.</p>
                <form className = "login-login" onSubmit = {handleSubmit}>
                    <div className = "form-item-login">
                        <label htmlFor='email' className = "label">Email </label><br/>
                        <input className = "form-element-login" type = "email" name = "email" id = "email-value" required autoComplete = "true" placeholder='Enter your email...' width = "400px" onChange = {onChange}></input>
                    </div>
                    <button type="submit" className ="submit-login">Reset my Password</button>
                </form>
                <div className = "bottom-text-login"><Link className = "loginLink-login" to = '/login'>Go to login</Link> </div>
            </div>
            <div className = "image-login">
                <img src = {forget} alt = "video" height = "370px"/>
            </div>
        </div>
    )
}

export default ForgetPage
