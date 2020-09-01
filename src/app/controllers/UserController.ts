import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/UserRepository';
import checkValidMongooseId from '../helpers/mongooseCheckValidId';
import NotValidMongooseId from '../errors/NotValidMongooseId';
import { UserDocument } from '../interfaces/UserInterface';

export default class UserController {

  static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const query = req.query;
    const users: UserDocument[] = await UserRepository.findAll(query);
    res.status(200);
    res.send(users);
  }

  static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!checkValidMongooseId(req.params.id)) {
      throw next(new NotValidMongooseId());
    }
    const user: UserDocument = await UserRepository.findById(req.params.id, next);
    res.status(200);
    res.send(user);
  }

  static async deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!checkValidMongooseId(req.params.id)) {
      throw next(new NotValidMongooseId());
    }
    await UserRepository.deleteById(req.params.id);
    res.status(204);
    res.send();
  }

  static async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!checkValidMongooseId(req.params.id)) {
      throw next(new NotValidMongooseId());
    }
    const user = await UserRepository.updateById(req.params.id, req.body);
    res.status(200);
    res.send(user);
  }
};
