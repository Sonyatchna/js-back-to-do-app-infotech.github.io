import jwt from 'jsonwebtoken';
import config from '../config';

export default ({ email, login, role, _id }: { email: string, login: string, role: string, _id: string }) => {
  return jwt.sign(
    { email, login, role, _id },
    config.secret,
    { expiresIn: '24h' }
  );
};