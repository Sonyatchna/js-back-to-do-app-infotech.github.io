import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import Unauthorized from '../errors/Unauthorized';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined = req.headers["x-access-token"] as string || req.headers["authorization"] as string;
    if (!token) return next(new Unauthorized('Access denied. No token provided.'));
    if (token.startsWith('JWT ')) token = token.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded: any) => {
      if (err) return next(new Unauthorized('Invalid token.'));
      (req as any).authUser = decoded;
      next();
    });
  } catch {
    throw next(new Unauthorized());
  }
};
