import { Request, Response, NextFunction} from 'express';
import { UserRoleEnum } from '../enums/UserRoleEnum';
import Forbidden from '../errors/Forbidden';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req as any).authUser.role !== UserRoleEnum.Admin) {
    throw next(new Forbidden());
  }
  next();
}
