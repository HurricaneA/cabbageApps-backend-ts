import { Request, Response } from 'express';
import Task from '../models/task';

// @desc    Get Tasks
// @route   GET /api/tasks
// @query   "asc", "desc", "null", "insertion"
// @access  Public
export const getTasks = async (req: Request, res: Response) => {
  const order = req.query.order;

  let sortBy = {};

  if (order === 'asc' || null) {
    sortBy = { title: 'asc' };
  } else if (order === 'desc') {
    sortBy = { title: 'descending' };
  } else {
    sortBy = { createdAt: -1 };
  }

  try {
    const tasks = await Task.find().sort(sortBy);
    res.status(200).json({
      tasks: tasks,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      error: error,
    });
  }
};

// @desc    Add Task
// @route   POST /api/tasks
// @access  Public
export const addTask = async (req: Request, res: Response) => {
  const { title, completed, date } = req.body;

  if (!title || !date) {
    return res.json({
      status: 'Failed',
      message: 'Fields cannot be empty',
    });
  }

  const newTask = new Task({
    title,
    completed,
    date,
  });

  try {
    const addedTask = await newTask.save();
    res.status(200).json(addedTask);
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      error: error,
    });
  }
};

// @desc    Update Task
// @route   PATCH /api/tasks/:id
// @access  Public
export const updateTask = async (req: Request, res: Response) => {
  const { title, completed, date } = req.body;
  console.log('received ', req.body);

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: title,
          completed: completed,
          date: date,
        },
      },
      { new: true }
    );
    console.log('updated to', updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      error: error,
    });
  }
};

// @desc    Remove Task
// @route   DELETE /api/tasks/:id
// @access  Public
export const removeTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  try {
    const removedTask = await Task.findOneAndDelete({ _id: taskId });
    res.status(200).json(removedTask);
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      status: 'Failed',
      error: error,
    });
  }
};
