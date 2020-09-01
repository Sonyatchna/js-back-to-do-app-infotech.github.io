import { BAD_REQUEST } from 'http-status-codes';
import { NextFunction } from 'express';
import UserModel from '../models/UserModel';
import EntityNotFound from '../errors/EntityNotFound';
import ValidationError from '../errors/ValidationError';
import { UserDocument, UserInterface } from '../interfaces/UserInterface';

export default class UserRepository {

  static async save(body: UserInterface, next: NextFunction): Promise<UserDocument> {
    const user: UserDocument = new UserModel(body);
    await user.save(err => {
      if (err) return next(new ValidationError(BAD_REQUEST, err.message))
    });
    return user;
  }

  static async findAll(query: object): Promise<UserDocument[]> {
    return await UserModel.find(query);
  }

  static async findById(id: string, next: NextFunction): Promise<UserDocument> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw next(new EntityNotFound(`User with id - ${id} does not exist`));
    }
    return user;
  }

  static async deleteById(id: string): Promise<UserDocument | null> {
    return UserModel.findByIdAndRemove(id);
  }

  static async updateById(id: string, body: UserInterface): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(id, body, { new: true });
  }
};