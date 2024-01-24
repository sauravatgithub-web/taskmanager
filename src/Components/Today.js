import './Today.css'
import React from 'react'
import Tasks from "./Tasks"

const Today = () => {
    return (
        <div>
            <div className="heading-body">
                Today
            </div>
            <div className = "tasks">
                <Tasks/>
            </div>
        </div>
    )
}

export default Today
