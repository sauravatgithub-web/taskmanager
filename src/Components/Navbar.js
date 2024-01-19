import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className = "navbar-div">
                <div className = "title">
                    <Link className="nav-main" to="/"><b>Task Manager</b></Link>
                </div>
                <div className = "list">
                    <ul className="navbar-list">
                        <li className="nav-items">
                            <Link className="nav-main-item" to="/">Features</Link>
                        </li>
                        <li className="nav-items">
                            <Link className="nav-main-item" to="/">For Teams</Link>
                        </li>
                        <li className="nav-items dropdown">
                            <Link className="nav-main-item" to="/">
                                Resources<i className="fa-solid fa-angle-down"></i>
                            </Link>
                            {/* <div className = "dropdown-content">
                                <p>This is hidden.</p>
                            </div> */}
                        </li>
                        <li className="nav-items">
                            <Link className="nav-main-item" to="/">Pricing</Link>
                        </li>
                        <li className="nav-items">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </li>
                        <li className="nav-items">
                            <Link className="nav-main-item" to="/login">Log In</Link>
                        </li>
                        <li className="nav-items"><Link className = "signUpLink" to = "/signUp">Start for Free</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
