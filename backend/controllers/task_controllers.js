const tasks = require('../data/tasks');


const fetch_all_tasks = ((req, res) => {
    res.json(tasks);
})
const add_task = ((req, res) => {
    console.log(req.body);
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description ? req.body.description : NULL,
        status: "pending",
        dueDate: req.body.dueDate,
    };
    tasks.push(newTask);
    console.log(tasks)
    res.status(201).json(newTask);
})

const fetch_task = ((req, res) => {
    // console.log("hello");
    // console.log(req.params);
    console.log(tasks.find(task => task.id === parseInt(req.params.id)));
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
})

const update_task = ((req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).send('Task not found');

    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    task.dueDate = req.body.dueDate;
    res.json(task);
})

const delete_task = ((req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) return res.status(404).send('Task not found');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
})

module.exports = { fetch_all_tasks, add_task, fetch_task, update_task, delete_task }

