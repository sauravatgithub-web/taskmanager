import './Today.css'
import React from 'react'
import Tasks from "./Tasks"

const Inbox = () => {
    return (
        <div>
            <div className="heading-body">
                Inbox
            </div>
            <div className = "tasks">
                <Tasks/>
            </div>
        </div>
    )
}

export default Inbox
