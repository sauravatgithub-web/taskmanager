import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Main.css"
import Today from './Today';
// import Inbox from './Inbox';
import TaskContext from '../Context/TaskContext'

const Main = () => {
    const navigate = useNavigate();
    const context = useContext(TaskContext);
    const [isVisible, setVisible] = useState(false);
    const [rightBtn, setRightBtn] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    const {addTask} = context;
    const [newTask, setNewTask] = useState({taskName : "", description : "", tag :  ""});
    // const [name, setName] = useState("");

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
        if (isVisible) {
            setVisible(false);
        }
    }

    const changeCurrentState = (e) => {
        let last = document.getElementsByClassName("current-option");
        for (let i = 0; i < last.length; i++) {
            last[i].classList.remove("current-option");
        }
        e.target.classList.add("current-option");
    }

    const showForm = () => {
        setIsFormVisible(true);
    }

    const handleLogOut = () => {
        navigate('/login');
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await addTask(newTask.taskName, newTask.description, newTask.tag);
        setIsFormVisible(false);
    }

    const onChange = (e) => {
        e.preventDefault();
        setNewTask({...newTask, [e.target.name] : e.target.value});
    }

    const setDueDate = (e) => {
        e.preventDefault();
    }

    const setPriority = (e) => {
        e.preventDefault();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setIsFormVisible(false);
    }

    // const host = "http://localhost:5000";
    // const getUser = async() => {
    //     const user = await fetch(`${host}/api/auth/getUser`, {
    //         method : "GET",
    //         headers : {
    //             "Content-type" : "application/json",
    //             "auth-token" : localStorage.getItem('token')
    //         }
    //     })
    //     setName(user.name);
    // }
    // getUser();

    return (
        <div className="mainPage" onClick={makeChanges}>
            <div className="leftBox">
                <div className="headerBar">
                    <div className="userName" onClick={makeThingsVisible}>Saurav <i className="fa-solid fa-angle-down"></i>
                        {isVisible && <div className="userOptions">
                            <ul className="userOption-list">
                                <li className="userOption-value">Saurav Singh</li><hr className="line" />
                                <li className="userOption-value"><i className="fa-solid fa-gear"></i> Settings</li>
                                <li className="userOption-value"><i className="fa-solid fa-plus"></i> Add a team</li><hr className="line" />
                                <li className="userOption-value"><i className="fa-solid fa-wave-square"></i> Activity Log</li>
                                <li className="userOption-value"><i className="fa-solid fa-print"></i> Print</li>
                                <li className="userOption-value"><i className="fa-solid fa-book-open"></i> Resources</li><hr className="line" />
                                <li className="userOption-value"><i className="fa-solid fa-rotate"></i> Sync</li><hr className="line" />
                                <li className="userOption-value" onClick={handleLogOut}><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</li><hr className="line" />
                                <li className="userOption-value">v001</li>
                            </ul>
                        </div>}
                    </div>
                    <div className="tooltip">
                        <i className="fa-regular fa-rectangle-list close-button" onClick={slideIn}></i>
                        <span className="tooltiptext">Open/Close Button</span>
                    </div>
                </div>
                <div>
                    <ul className="options">
                        <li className="option-value" onClick={showForm}><i className="fa-solid fa-circle-plus"></i> Add-Task</li>
                        <li className="option-value" onClick={changeCurrentState}><i className="fa-solid fa-magnifying-glass"></i> Search</li>
                        <li className="option-value" onClick={changeCurrentState}><i className="fa-solid fa-inbox"></i> Inbox</li>
                        <li className="option-value current-option" onClick={changeCurrentState}><i className="fa-solid fa-calendar-day"></i> Today</li>
                        <li className="option-value" onClick={changeCurrentState}><i className="fa-solid fa-calendar"></i> Upcoming</li>
                        <li className="option-value" onClick={changeCurrentState}><i className="fa-solid fa-tags"></i> Filters and labels</li>
                    </ul>
                </div>
            </div>
            <div className="rightBox">
                <div className="top-symbols">
                    {rightBtn && <i className="fa-regular fa-rectangle-list open-button" onClick={slideOut}></i>}
                    <i className="fa-solid fa-sliders slider"></i>
                </div>
                <div className="content-body">
                    {isFormVisible && <form className="add-item-lb" onSubmit={handleSubmit}>
                        <div className="top-item-lb">
                            <div><input className="task-name-lb filled" placeholder="Task Name" type="text" name="taskName" onChange={onChange}></input></div>
                            <div><input className="description-lb" placeholder='Description' type="text" name="description" onChange={onChange}></input></div>
                            <div>
                                <button className="due-date-lb" onClick={setDueDate}><i className="fa-solid fa-calendar-day"></i> Today <i className="fa-solid fa-xmark"></i></button>
                                <button className="priority-lb" onClick={setPriority}><i className="fa-regular fa-flag"></i> Priority</button>
                            </div>
                        </div>
                        <hr className="line" />
                        <div className="bottom-item-lb">
                            <button className="cancel-lb" onClick={handleCancel}>Cancel</button>
                            <button className="add-task-lb" type="submit">Add Task</button>
                        </div>
                    </form>}
                    <div className='current-content'>
                        <Today />
                        {/* <Inbox /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
