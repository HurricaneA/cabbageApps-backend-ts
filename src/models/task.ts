import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  title: string;
  completed: boolean;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
