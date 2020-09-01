import { Document } from 'mongoose';

export interface UserInterface {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  email: string;
  role: string;
}

export type UserDocument = UserInterface & Document;
