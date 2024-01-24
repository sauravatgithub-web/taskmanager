const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    }, 
    tag: {
        type: String
    },
    date : {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        default: () => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            return currentDate;
        }
    }
});

const Task= mongoose.model('task', taskSchema);
Task.createIndexes();
module.exports = Task;