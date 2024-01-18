const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express();           
const port = 5000;   

app.use(cors());
// app.use(express.json());

// // Availaible routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/data', require('./routes/data'));

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(port, ()=> {
    console.log(`Connection successful. Server is listening at http://localhost:${port}`);
})
