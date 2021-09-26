import {
  getTasks,
  addTask,
  updateTask,
  removeTask,
} from '../controller/task.controller';
const express = require('express');
const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.patch('/:id', updateTask);
router.delete('/:id', removeTask);

export default router;
