import express, { NextFunction, Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import errorHandlerMiddleware from '../errorHandler';
import initRoutes from '../routes';
require('dotenv').config();

export async function appBootstrap(): Promise<Application> {
  const app: Application = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    next();
  });

  initRoutes(app);

  app.use(errorHandlerMiddleware);
  return app;
}
