import { bootstrap } from './bootstrap/bootstrap';

bootstrap().catch((err: Error) => {
  console.error(err.message, err);
  process.exit(1);
});