import mongoose from 'mongoose';
import { TaskDocument } from '../interfaces/TaskInterface';

const taskSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  expiredDate: { type: Date }
});

export default mongoose.model<TaskDocument>('Task', taskSchema);
