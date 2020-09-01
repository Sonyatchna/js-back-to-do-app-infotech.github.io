import { Application } from 'express';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import TaskController from './controllers/TaskController';
import authMiddleware from './middleware/authMiddleware';
import { isAdmin } from './middleware/isAdmin';

export default function initRoutes(app: Application) {
  app.post('/auth/login', AuthController.loginUser);
  app.post('/auth/register', AuthController.registerUser);

  app.get('/users', authMiddleware, isAdmin, UserController.getAllUsers);
  app.get('/users/:id', authMiddleware, isAdmin, UserController.getUserById);
  app.patch('/users/:id', authMiddleware, isAdmin, UserController.updateUserById);
  app.delete('/users/:id', authMiddleware, isAdmin, UserController.deleteUserById);

  app.post('/tasks', authMiddleware, TaskController.createTask);
  app.get('/tasks', authMiddleware, TaskController.getAllTasks);
  app.get('/tasks/:id', authMiddleware, TaskController.getTaskById);
  app.patch('/tasks/:id', authMiddleware, TaskController.updateTaskById);
  app.delete('/tasks/:id', authMiddleware, TaskController.deleteTaskById);
};