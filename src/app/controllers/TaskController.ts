import moment from 'moment';
import { Request, Response, NextFunction } from 'express';
import TaskRepository from '../repositories/TaskRepository';
import { UserRoleEnum } from '../enums/UserRoleEnum';
import Forbidden from '../errors/Forbidden';
import { CronService } from '../services/CronService';
import ExpirationDateError from '../errors/ExpirationDateError';
import checkValidMongooseId from '../helpers/mongooseCheckValidId';
import NotValidMongooseId from '../errors/NotValidMongooseId';
import { TaskDocument, TaskInterface } from '../interfaces/TaskInterface';

export default class TaskController {

  static async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    const taskBody: TaskInterface = req.body;
    if (taskBody.ownerId && (req as any).authUser.role !== UserRoleEnum.Admin && taskBody.ownerId !== (req as any).authUser._id) {
      throw next(new Forbidden());
    } else {
      taskBody.ownerId = (req as any).authUser._id;
    }

    if (taskBody.expiredDate && moment(taskBody.expiredDate).isBefore(new Date())) {
      throw next(new ExpirationDateError('Expiration date must be in future!'));
    }

    const task: TaskDocument = await TaskRepository.save(req.body, next);

    if (task.expiredDate) {
      CronService.scheduleRemovingTask(task);
    }
    res.status(201);
    res.send(task);
  }

  static async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    const query = req.query;
    if ((req as any).authUser.role !== UserRoleEnum.Admin) {
      query.ownerId = (req as any).authUser._id;
    }
    const tasks: TaskDocument[] = await TaskRepository.findAll(query);
    res.status(200);
    res.send(tasks);
  }

  static async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    let query: any = { _id: req.params.id };
    if (!checkValidMongooseId(req.params.id)) {
      throw next(new NotValidMongooseId());
    }
    if ((req as any).authUser.role !== UserRoleEnum.Admin) {
      query.ownerId = (req as any).authUser._id;
    }
    const task: TaskDocument = await TaskRepository.findById(req.params.id, next, query);
    res.status(200);
    res.send(task);
  }

  static async deleteTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    let query: any = { _id: req.params.id };
    if (!checkValidMongooseId(req.params.id)) {
      throw next(new NotValidMongooseId());
    }
    if ((req as any).authUser.role !== UserRoleEnum.Admin) {
      query.ownerId = (req as any).authUser._id;
    }
    await TaskRepository.deleteById(req.params.id, next, query);
    res.status(204);
    res.send();
  }

  static async updateTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    let query: any = { _id: req.params.id };
    if (!checkValidMongooseId(req.params.id)) {
      throw next(new NotValidMongooseId());
    }
    if ((req as any).authUser.role !== UserRoleEnum.Admin) {
      query.ownerId = (req as any).authUser._id;
    }
    const task: TaskDocument = await TaskRepository.updateById(req.params.id, req.body, next, query);
    res.status(200);
    res.send(task);
  }
};
