import TaskContext from './TaskContext'
import {useState} from 'react'

const jwt = require('../creatorToken');
const JWT_SECRET = "task_schema745@gmail"

const TaskState = (props) => {
    const host = "http://localhost:5000";
    const [tasks, setTasks] = useState([]);
    const [isSuitcase, setIsSuitcase] = useState(true);

    // Get all tasks
    const getTasks = async () => {
        // API call
        const response = await fetch(`${host}/api/task/fetchAllTasks`, {
            method: "GET",
            headers : {
                "content-type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setTasks(json);
    }

    // Add a task
    const addTask = async (taskName, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/task/addTask`, {
            method : "POST",
            headers : {
                "content-type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            },
            body : JSON.stringify({taskName, description, tag})
        })

        const authToken = response.headers['auth-token'];
        const id = jwt.verify(authToken, JWT_SECRET);

        const currentDate = new Date();
        const date = currentDate.toDateString();
        let taskItem = {
            "user" : {id},
            "taskName" : taskName,
            "description" : description,
            "tag" : tag,
            "date" : {date}
        };

        setTasks(tasks.concat(taskItem));
        console.log("New task added successfully.");
    }

    // Edit a task
    const editTask = async (id, taskName, description, tag) => {
        // API call
        await fetch(`${host}/api/task/updateTask/${id}`, {
            method : "PUT",
            headers : {
                "Content-type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            },
            body : JSON.stringify({taskName, description, tag})
        })

        let newTask = JSON.parse(JSON.stringify(tasks));
        for(let idx = 0; idx < newTask.length; idx++) {
            const element = newTask[idx];
            if(element._id === id) {
                newTask[idx].taskName = taskName;
                newTask[idx].description = description;
                newTask[idx].tag = tag;
                break;
            }
        }
        setTasks(newTask);
    }

    // Delete a task
    const deleteTask = async (id) => {
        //API call
        await fetch(`${host}/api/task/deleteTask/${id}`, {
            method : "DELETE",
            headers : {
                "Content-type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            }
        });

        const newTask = tasks.filter((tasks) => {return tasks._id !== id});
        setTasks(newTask);
        console.log(`Task with ${id} is deleted successfully.`);
    }

    return (
        <TaskContext.Provider value = {{tasks, getTasks, addTask, deleteTask, editTask, isSuitcase, setIsSuitcase}}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;