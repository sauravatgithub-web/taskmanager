const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleWare/fetchUser');

let success = false;
// Route 1: fetch all tasks using GET "/api/task/fetchAll"
router.get('/fetchAllTasks', fetchUser, async(req, res) => {
    try {
        const tasks = await Task.find({
            user : req.user.id
        });
        res.send(tasks);
    }
    catch (error) {
        console.error(error);
        success = false;
        res.status(500).send({success, message : "Some error occured in delievering the tasks."});
    }
})

// Route 2: adding a new task using POST: "/api/task/addTask"
router.post('/addTask', [
    body('taskName', "Enter a valid task name").isLength({min : 1}),
    body('description', "Description must be atleast 2 characters long").isLength({min : 2}),
], fetchUser, async(req, res) => {
    try {
        const { taskName, description, tag } = req.body;

        // check for errors
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            success = false;
            res.status(400).json({success, errors : errors.array()});
        }
        else {
            const newTask = new Task({
                taskName, description, tag, user : req.user.id
            })
            const savedTask = await newTask.save();
            console.log(`A new task has been added for the user`);
            success = true;
            res.json({success, savedTask});
        }
    }
    catch (error) {
        console.log(error);
        success = false;
        res.status(500).send({success, message : "Some error occured in adding a new task"});
    }
})

// Router 3: Update a task using PUT "/api/task/updateTask"
router.put('/updateTask/:id', fetchUser, async(req, res) => {
    try {
        // find the task to be updated
        let task = await Task.findById(req.params.id);
        if(!task) {
            res.status(500).send("Task not found.");
        }
        else {
            // Allow updation only if user is himself
            if(task.user.toString() !== req.user.id) {
                res.status(401).send("You are not the authorized person.");
            }
            else {
                const {taskName, description, tag} = req.body;

                // create a new task
                const newTask = {};
                if(taskName) {newTask.taskName = taskName};
                if(description) {newTask.description = description};
                if(tag) {newTask.tag = tag};

                task = await Task.findByIdAndUpdate(req.params.id, {$set : newTask}, {new : true});
                console.log("Your note is successfully updated.");
                res.json({task});
            }
        }
    }
    catch (error) {
        console.log(error);
        success = false;
        res.status(500).send({success, message : "Error in updating the task"})
    }
})

// Router 4 : Deleting a task using DELETE: "/api/task/deleteTask"
router.delete('/deleteTask/:id', fetchUser, async(req, res) => {
    try {
        // find the task to be deleted
        let task = await Task.findById(req.params.id);
        if(!task) {
            res.status(500).send("Task not found.");
        }
        else {
            // allow deletion only if user is himself the creator
            if(task.user.toString() !== req.user.id) {
                res.status(401).send("You are not the authorized person.");
            }
            else {
                task = await Task.findByIdAndDelete(req.params.id);
                console.log("Your task is successfully deleted.");
                res.json("Your task is deleted successfully.");
            }
        }
    }
    catch (error) {
        console.log(error);
        success = false;
        res.status(500).send({success, message : "Some error occured in deleting a task"});
    }
})

module.exports = router;