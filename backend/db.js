const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/taskmanager";

const connectToMongo = () => {
    mongoose.connect(mongoURI);
    console.log("Connected to MongoDB for Task Manager App successfully.");
}

module.exports = connectToMongo;