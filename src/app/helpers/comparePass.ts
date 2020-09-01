import { NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import ValidationError from '../errors/ValidationError';
import { UNAUTHORIZED } from 'http-status-codes';

export function comparePassword(password: string, hashedPassword: string, next: NextFunction) {
  try {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err: Error, result: any) => {
        if (err) reject(err.message);
        resolve(result);
      });
    })
  } catch (err) {
    throw next(new ValidationError(UNAUTHORIZED, 'Not correct password.'));
  }
}
