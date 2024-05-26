const express = require("express");
const { add_task, delete_task, update_task, fetch_all_tasks, fetch_task } = require("../controllers/task_controllers");


const router = express.Router();

router.route('/').post(add_task);
router.route('/').get(fetch_all_tasks);
router.route('/:id').get(fetch_task);
router.route('/:id').put(update_task);
router.route('/:id').delete(delete_task);

module.exports = router