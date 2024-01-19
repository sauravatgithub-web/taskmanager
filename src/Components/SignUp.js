import React, {useState} from 'react'
import symbol from './Images/symbol.mp4'
import "./SignUp.css"
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [credentials, setCredentials] = useState({name : " ", email : " ", password: " "});
    const navigate = useNavigate();

    const host = "http://localhost:5000";
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body : JSON.stringify({name : credentials.name, email : credentials.email, password : credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/login");
        }
        else {
            alert("Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }

    return (
        <div className = "page">
            <div className = "form">
                <div id = "firstText">Sign Up</div><br/>
                <div className = "googleSign"><i className = "fa-brands fa-google"></i>  Continue with Google</div>
                <div className = "googleSign"><i className = "fa-brands fa-facebook"></i>  Continue with FaceBook</div>
                <div className = "googleSign"><i className = "fa-brands fa-apple"></i>  Continue with Apple</div>
                <form className = "login" onSubmit = {handleSubmit}>
                    <div className = "form-item">
                        <label htmlFor='name' className = "label">Name </label><br/>
                        <input className = "form-element" type = "name" name = "name" id = "name-value" required autoComplete = "true" placeholder='Enter your name...' width = "400px" onChange = {onChange}></input>
                    </div>
                    <div className = "form-item">
                        <label htmlFor='email' className = "label">Email </label><br/>
                        <input className = "form-element" type = "email" name = "email" id = "email-value" required autoComplete = "true" placeholder='Enter your email...' width = "400px" onChange = {onChange}></input>
                    </div>
                    <div className = "form-item">
                        <label htmlFor='password' className = "label">Password </label><br/>
                        <input className = "form-element" type = "password" name = "password" id = "password-value" required autoComplete = "true" placeholder = "Enter your password..." width = "400px" onChange = {onChange}></input>
                    </div>
                    <button type="submit" className ="Submit">Sign Up with Password</button>
                </form>
                <div className = "bottom-second">By continuing with Google, Apple, or Email, you agree to Task Manager's Terms of Service and Privacy Policy.</div>
                <div className = "bottom-text">Already have an account? <Link className = "loginLink" to = '/login'>Login</Link> </div>
            </div>
            <div className = "video">
                <video src = {symbol} alt = "video" height = "420px" autoPlay muted/>
            </div>
        </div>
    )
}

export default SignUp
