import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Main.css"
import Today from './Today';

const Main = () => {
    const navigate = useNavigate();
    const [isVisible, setVisible] = useState(false);
    const [rightBtn, setRightBtn] = useState(false);

    const slideIn = () => {
        let left = document.getElementsByClassName("leftBox");
        let right = document.getElementsByClassName("rightBox");
        for (let i = 0; i < left.length; i++) {
            left[i].style.display = "none";
        }
        for (let i = 0; i < right.length; i++) {
            right[i].style.width = "100%";
        }
        setRightBtn(true);
    }

    const slideOut = () => {
        let left = document.getElementsByClassName("leftBox");
        let right = document.getElementsByClassName("rightBox");
        for (let i = 0; i < left.length; i++) {
            left[i].style.display = "block";
        }
        for (let i = 0; i < right.length; i++) {
            right[i].style.width = "78%";
        }
        setRightBtn(false);
    }

    const makeThingsVisible = () => {
        setVisible(!isVisible);
    }

    const makeChanges = () => {
        if(isVisible) {
            setVisible(false);
        }
    }

    const changeCurrentState = (e) => {
        let last = document.getElementsByClassName("current-option");
        for(let i = 0; i < last.length; i++) {
            last[i].classList.remove("current-option");
        }
        e.target.classList.add("current-option");
    }

    const handleLogOut = () => {
        navigate('/login');
    }

    return (
        <div className = "mainPage" onClick = {makeChanges}>
            <div className = "leftBox">
                <div className = "headerBar">
                    <div className = "userName" onClick = {makeThingsVisible}>Saurav <i className="fa-solid fa-angle-down"></i>
                        {isVisible && <div className = "userOptions">
                            <ul className = "userOption-list">
                                <li className = "userOption-value">Saurav Singh</li><hr className = "line"/>
                                <li className = "userOption-value"><i className = "fa-solid fa-gear"></i> Settings</li>
                                <li className = "userOption-value"><i className = "fa-solid fa-plus"></i> Add a team</li><hr className = "line"/>
                                <li className = "userOption-value"><i className = "fa-solid fa-wave-square"></i> Activity Log</li>
                                <li className = "userOption-value"><i className = "fa-solid fa-print"></i> Print</li>
                                <li className = "userOption-value"><i className = "fa-solid fa-book-open"></i> Resources</li><hr className = "line"/>
                                <li className = "userOption-value"><i className = "fa-solid fa-rotate"></i> Sync</li><hr className = "line"/>
                                <li className = "userOption-value" onClick = {handleLogOut}><i className = "fa-solid fa-arrow-right-from-bracket"></i> Log Out</li><hr className = "line"/>
                                <li className = "userOption-value">v001</li>
                            </ul>
                        </div>}
                    </div>
                    <div className = "tooltip">
                        <i className = "fa-regular fa-rectangle-list close-button" onClick = {slideIn}></i>
                        <span className = "tooltiptext">Open/Close Button</span>
                    </div>
                </div>
                <div>
                    <ul className = "options">
                        <li className = "option-value" onClick = {changeCurrentState}><i className = "fa-regular fa-square-plus"></i> Add-Task</li>
                        <li className = "option-value" onClick = {changeCurrentState}><i className = "fa-solid fa-magnifying-glass"></i> Search</li>
                        <li className = "option-value" onClick = {changeCurrentState}><i className = "fa-solid fa-inbox"></i> Inbox</li>
                        <li className = "option-value current-option" onClick = {changeCurrentState}><i className = "fa-solid fa-calendar-day"></i> Today</li>
                        <li className = "option-value" onClick = {changeCurrentState}><i className = "fa-solid fa-calendar"></i> Upcoming</li>
                        <li className = "option-value" onClick = {changeCurrentState}><i className = "fa-solid fa-tags"></i> Filters and labels</li>
                    </ul>
                </div>
            </div>
            <div className = "rightBox">
                <div className = "top-symbols">
                    {rightBtn && <i className = "fa-regular fa-rectangle-list open-button" onClick = {slideOut}></i>}
                    <i className = "fa-solid fa-sliders slider"></i>
                </div>
                <div className = "content-body">
                    <Today/>
                </div>
            </div>
        </div>
    )
}

export default Main
