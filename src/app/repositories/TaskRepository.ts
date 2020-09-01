import { BAD_REQUEST } from 'http-status-codes';
import { NextFunction } from 'express';
import EntityNotFound from '../errors/EntityNotFound';
import ValidationError from '../errors/ValidationError';
import TaskModel from '../models/TaskModel';
import { MongooseFilterQuery } from 'mongoose';
import { TaskDocument, TaskInterface } from '../interfaces/TaskInterface';

export default class TaskRepository {

  static async save(body: TaskInterface, next: NextFunction): Promise<TaskDocument> {
    const task: TaskDocument = new TaskModel(body);
    await task.save((err: Error) => {
      if (err) throw next(new ValidationError(BAD_REQUEST, err.message))
    });
    return task;
  }

  static async findAll(query: object): Promise<TaskDocument[]> {
    return await TaskModel.find(query);
  }

  static async findById(id: string, next: NextFunction, query: MongooseFilterQuery<Pick<TaskDocument, '_id' | 'ownerId'>>): Promise<TaskDocument> {
    const tasks: TaskDocument[] = await TaskModel.find(query);
    const task: TaskDocument = tasks[0];
    if (!task) {
      throw next(new EntityNotFound(`Task with id - ${id} does not exist`));
    }
    return task;
  }

  static async deleteById(id: string, next: NextFunction, query: MongooseFilterQuery<Pick<TaskDocument, '_id' | 'ownerId'>>): Promise<void> {
    const tasks: TaskDocument[] = await TaskModel.find(query);
    const task: TaskDocument = tasks[0];
    if (!task) {
      throw next(new EntityNotFound(`Task with id - ${id} does not exist`))
    }
    await task.remove();
  }

  static async updateById(id: string, body: TaskInterface, next: NextFunction, query: MongooseFilterQuery<Pick<TaskDocument, '_id' | 'ownerId'>>): Promise<TaskDocument> {
    const tasks: TaskDocument[] = await TaskModel.find(query);
    let task: TaskDocument = tasks[0];
    if (!task) {
      throw next(new EntityNotFound(`Task with id - ${id} does not exist`));
    }
    return await TaskModel.findByIdAndUpdate(id, body, { new: true }) as TaskDocument;
  }
};
