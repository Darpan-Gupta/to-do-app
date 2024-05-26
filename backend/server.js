const express = require("express");
const dotenv = require("dotenv");
const task_routes = require('./routes/task_routes');

dotenv.config();

const app = express();

app.use(express.json()); // to accept json data

app.get("/", (req, res) => {
    res.send("app/server is running");
});

app.use('/api/tasks', task_routes);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server started on ${PORT}`));

