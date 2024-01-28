import React, { useContext, useEffect, useState } from 'react'
import TaskContext from '../Context/TaskContext'
import { useNavigate } from 'react-router-dom'
import TaskItem from './TaskItem'
import TaskAbsent from './TaskAbsent'
import "./Tasks.css"

const Tasks = () => {
    const context = useContext(TaskContext)
    const { tasks, getTasks, addTask, isSuitcase, setIsSuitcase } = context;
    const [task, setTask] = useState({taskName : "", description : "", tag : ""});
    const [formVisible, setFormVisible] = useState(false);
    const [plus, setPlus] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getTasks();
        }
        else {
            navigate('/login');
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask(task.taskName, task.description, task.tag);
        let form = document.getElementsByClassName("add-item");
        for(let i = 0; i < form.length; i++) {
            form[i].querySelector(".task-name").value = "";
            form[i].querySelector(".description").value = "";
        }
    }

    const onChange = (e) => {
        setTask({...task, [e.target.name] : e.target.value});
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setPlus(true);
        setFormVisible(false);
        setIsSuitcase(true);
    }

    const setDueDate = (e) => {
        e.preventDefault();
    }
    const setPriority = (e) => {
        e.preventDefault();
    }

    const additem = () => {
        setPlus(false);
        setFormVisible(true);
        setIsSuitcase(!isSuitcase);
    }

    const changeSign = (event) => {
        let plusSign = event.currentTarget.querySelector(".fa-plus");
        plusSign.classList.remove("fa-plus");
        plusSign.classList.add("fa-circle-plus");
    }

    const changeSignAgain = (event) => {
        let plusSign = event.currentTarget.querySelector(".fa-circle-plus");
        plusSign.classList.remove("fa-circle-plus");
        plusSign.classList.add("fa-plus");
    }

    return (
        <div>
            {(tasks.length === 0) && (plus) && (!formVisible) && (
                <>
                    <div className="plus-hide" onClick={additem} onMouseEnter = {changeSign} onMouseLeave={changeSignAgain}><i className="fa-solid fa-plus plus"></i> Add Task</div>
                    <TaskAbsent/>
                </>
            )}
            {tasks.length !== 0 && (
                <div>
                    <i className="fa-regular fa-circle-check"></i>&nbsp;
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                </div>
            )}
            {tasks.map((task) => {
                return <TaskItem key={task._id} task={task} />
            })}
            {tasks.length !== 0 && (plus) && (!formVisible) && (
                <div className="plus-hide" onClick={additem} onMouseEnter = {changeSign} onMouseLeave={changeSignAgain}><i className="fa-solid fa-plus plus"></i> Add Task</div>
            )}
            {(!plus) && (formVisible) && <form className="add-item" onSubmit={handleSubmit}>
                <div className="top-item">
                    <div><input className="task-name filled" placeholder="Task Name" type="text" name="taskName" onChange={onChange}></input></div>
                    <div><input className="description" placeholder='Description' type="text" name="description" onChange={onChange}></input></div>
                    <div>
                        <button className="due-date" onClick={setDueDate}><i className="fa-solid fa-calendar-day"></i> Today <i className="fa-solid fa-xmark"></i></button>
                        <button className="priority" onClick={setPriority}><i className="fa-regular fa-flag"></i> Priority</button>
                    </div>
                </div>
                <hr className="line" />
                <div className="bottom-item">
                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                    <button className="add-task" type="submit">Add Task</button>
                </div>
            </form>}
        </div>
    )
}

export default Tasks
