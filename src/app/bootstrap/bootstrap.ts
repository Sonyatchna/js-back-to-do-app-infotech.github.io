import { appBootstrap } from './appBootstrap';
import { databaseBootstrap } from './databaseBootstrap';
import { Application } from 'express';

export async function bootstrap(): Promise<void> {
  const app: Application = await appBootstrap();
  await databaseBootstrap();

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
