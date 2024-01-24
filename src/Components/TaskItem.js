import React from 'react'
import "./TaskItem.css"

const TaskItem = (props) => {
    const {task} = props;

    const showOptions = (e) => {
        let elem = e.currentTarget.querySelector(".edit");
        elem.style.display = "block";
    }

    const hideOptions = (e) => {
        let elem = e.currentTarget.querySelector(".edit");
        elem.style.display = "none";
    }

    return (
        <div className = "task-item" onMouseEnter = {showOptions} onMouseLeave = {hideOptions}>
            <div className = "head">
                <i className = "fa-regular fa-circle checkBox"></i>  {task.taskName}
                <i className = "fa-solid fa-pencil edit"></i>
            </div>
            <div className = "body">{task.description}</div>
        </div>
    )
}

export default TaskItem
