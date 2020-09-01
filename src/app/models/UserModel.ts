import mongoose from 'mongoose';
import { UserDocument } from '../interfaces/UserInterface';
import { UserRoleEnum } from '../enums/UserRoleEnum';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: [UserRoleEnum.Admin, UserRoleEnum.User] }
});

export default mongoose.model<UserDocument>('User', userSchema);
