const mongoose = require('mongoose')

const task_model = mongoose.Schema(
    {
        task_title: { type: String, trim: true },
        task_description: { type: String, trim: true },
        task_completed: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);


const task = mongoose.model("Chat", task_model);

module.exports = task;