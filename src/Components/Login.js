import React, { useState } from 'react'
import symbol from './Images/computer.png'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({email : "", password: ""});
    const navigate = useNavigate();

    const host = "http://localhost:5000";

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/userLogin`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                email : credentials.email,
                password : credentials.password
            })
        })
        const json = await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            alert("Logged in successfully");
            navigate("/main"); 
        }
        else {
            alert("Invalid credentials..");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }

    return (
        <div className = "page">
            <div className = "form" onSubmit = {handleSubmit}>
                <div id = "firstText">Log In</div><br/>
                <div className = "googleSign"><i className = "fa-brands fa-google"></i>  Continue with Google</div>
                <div className = "googleSign"><i className = "fa-brands fa-facebook"></i>  Continue with FaceBook</div>
                <div className = "googleSign"><i className = "fa-brands fa-apple"></i>  Continue with Apple</div>
                <form className = "login">
                    <div className = "form-item">
                        <label htmlFor='email' className = "label">Email </label><br/>
                        <input className = "form-element" type = "email" name = "email" id = "email-value" required autoComplete = "true" placeholder='Enter your email...' width = "400px" onChange = {onChange}></input>
                    </div>
                    <div className = "form-item">
                        <label htmlFor='password' className = "label">Password </label><br/>
                        <input className = "form-element" type = "password" name = "password" id = "name-value" required autoComplete = "true" placeholder = "Enter your password..." width = "400px" onChange = {onChange}></input>
                    </div>
                    <button type="submit" className ="Submit">Log In</button>
                </form>
                <div className = "bottom-first"><Link to = "/forgetPassword">Forgot your password?</Link></div>
                <div className = "bottom-second">By continuing with Google, Apple, or Email, you agree to Task Manager's Terms of Service and Privacy Policy.</div>
                <div className = "bottom-text">Don't have an account? <Link className = "loginLink" to = '/signUp'>Sign up</Link> </div>
            </div>
            <div className = "video">
                <img src = {symbol} alt = "video" height = "320px"/>
            </div>
        </div>
    )
}

export default Login
