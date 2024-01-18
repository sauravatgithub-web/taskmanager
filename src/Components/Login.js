import React from 'react'
import symbol from './Images/symbol.mp4'
import "./Login.css"
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className = "page">
            <div className = "form">
                <form className = "login">
                    <div className = "form-item">
                        <label htmlFor='email' className = "label">Email </label><br/>
                        <input className = "form-element" type = "email" name = "email" id = "email-value" required autoComplete = "true" placeholder='Enter your email...' width = "400px"></input>
                    </div>
                    <div className = "form-item">
                        <label htmlFor='password' className = "label">Password </label><br/>
                        <input className = "form-element" type = "password" name = "password" id = "name-value" required autoComplete = "true" placeholder = "Enter your password..." width = "400px"></input>
                    </div>
                    <button type="submit" className ="Submit">Sign up with Email</button>
                </form>
                <div className = "bottom-first">Forgot your password?</div>
                <div className = "bottom-text">Don't have an account? <Link className = "loginLink" to = '/login'>Sign up</Link> </div>
            </div>
            <hr/>
            <div className = "video">
                <video src = {symbol} alt = "video" height = "420px" loop = {true}/>
                <div className = "video-content">
                    
                </div>
            </div>
        </div>
    )
}

export default Login
