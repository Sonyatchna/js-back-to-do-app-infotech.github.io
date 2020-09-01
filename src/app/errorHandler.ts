import { NextFunction, Request, Response } from 'express';

export default function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  const errorBody = {
    message: err.message,
    statusCode: err.code || 500
  };
  res.status(errorBody.statusCode).send(errorBody);
};