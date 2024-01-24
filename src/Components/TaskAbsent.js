import './Today.css'
import React, { useContext } from 'react'
import TaskContext from '../Context/TaskContext'
import suitcase from "./Images/suitcase.jpeg"
import "./TaskAbsent.css"

const Task_absent = () => {
    const context = useContext(TaskContext);
    const {isSuitcase} = context;

    return (
        <div>
            <div className="main-content-here">
                {isSuitcase && <div className="suitcase">
                    <img src={suitcase} alt="suitcase" /><br />
                    <span className="img-content-1">Have a marvelous day off, Saurav!</span><br />
                    <span className="img-content-2">Schedule days off in the Productivity tab<br />of your Settings menu.</span>
                </div>}
            </div>
        </div>
    )
}

export default Task_absent
