import React, {useState, useContext} from 'react'
import TaskContext from '../Context/TaskContext';
import "./TaskItem.css"
// import pop from './pop.mp3'

const TaskItem = (props) => {
    const {task} = props;
    const context = useContext(TaskContext);
    const {editTask, deleteTask} = context;
    const [forward, setForward] = useState(false);
    const [newTask, setNewTask] = useState({taskName : task.taskName, description : task.description, tag : task.tag});

    const showOptions = (e) => {
        let elem = e.currentTarget.querySelector(".heading-options");
        elem.style.display = "block";
    }

    const hideOptions = (e) => {
        let elem = e.currentTarget.querySelector(".heading-options");
        elem.style.display = "none";
    }

    const handleDelete = () => {
        deleteTask(task._id);
    }

    const allowEdit = () => {
        setForward(true);
    }

    const onChange = (e) => {
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
        setForward(false);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await editTask(task._id, newTask.taskName, newTask.description, newTask.tag);
        setForward(false);
    }

    return (
        <div className = "task-item" onMouseEnter = {showOptions} onMouseLeave = {hideOptions}>
            <div className = "head">
                <div className = "heading-name">
                    <i className = "fa-regular fa-circle checkBox" onClick = {handleDelete}></i>  {task.taskName}
                </div>
                <div className = "heading-options">
                    <i className = "fa-solid fa-pencil edit" onClick = {allowEdit}></i>
                    <i className ="fa-solid fa-calendar dueDate"></i>
                    <i className="fa-solid fa-ellipsis-vertical showAllOptions"></i>
                </div>
            </div>
            <div className = "body">&emsp;&nbsp;{task.description}</div><hr/>
            {forward && <form className="add-item" onSubmit={handleSubmit}>
                <div className="top-item">
                    <div><input className="task-name filled" placeholder="Task Name" type="text" name="taskName" defaultValue = {task.taskName} onChange={onChange}></input></div>
                    <div><input className="description" placeholder='Description' type="text" name="description" defaultValue = {task.description} onChange={onChange}></input></div>
                    <div>
                        <button className="due-date" onClick={setDueDate}><i className="fa-solid fa-calendar-day"></i> Today <i className="fa-solid fa-xmark"></i></button>
                        <button className="priority" onClick={setPriority}><i className="fa-regular fa-flag"></i> Priority</button>
                    </div>
                </div>
                <hr className="line" />
                <div className="bottom-item">
                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                    <button className="add-task" type="submit">Save</button>
                </div>
            </form>}
        </div>
    )
}

export default TaskItem
