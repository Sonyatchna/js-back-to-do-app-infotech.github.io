import { Document } from 'mongoose';

export interface TaskInterface {
  text: string;
  ownerId: string;
  expiredDate: Date;
}

export type TaskDocument = TaskInterface & Document;
