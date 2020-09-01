import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/UserRepository';
import UserModel from '../models/UserModel';
import ValidationError from '../errors/ValidationError';
import { BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';
import hashPassword from '../helpers/cryptoHelper';
import { comparePassword } from '../helpers/comparePass';
import generateToken from '../helpers/generateToken';
import { UserDocument, UserInterface } from '../interfaces/UserInterface';

export default class AuthController {

  static async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userBody: UserInterface = req.body;
    const users: UserDocument[] = await UserRepository.findAll({login: userBody.login});

    if (users.length !== 1) {
      throw next(new ValidationError(UNAUTHORIZED, 'User does not exists.'));
    }

    const user: UserDocument = users[0];

    if (!await comparePassword(userBody.password, user.password, next)) {
      throw next(new ValidationError(UNAUTHORIZED, 'Not correct password.'));
    }

    const token: string = generateToken({email: user.email, login: user.login, role: user.role, _id: user._id});
    const responseJSON = {
      message: 'success',
      token,
      code: 200
    };
    res.status(200).send(responseJSON);
  }

  static async registerUser(req: Request, res: Response, next: NextFunction): Promise<UserDocument> {
    const userBody: UserInterface = req.body;
    const user: UserDocument = new UserModel(userBody);
    await hashPassword(user);
    return user.save((err: Error) => {
      if (err) throw next(new ValidationError(BAD_REQUEST, err.message));
      res.status(200).send(user);
    });
  }
};