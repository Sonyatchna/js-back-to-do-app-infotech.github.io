import bcrypt from 'bcryptjs';
import { UserInterface } from '../interfaces/UserInterface';
const saltRounds: number = 10;

export default function hashPassword(user: UserInterface){
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, saltRounds, (err: Error, hash: string) => {
      if(err) reject(err.message);
      user.password = hash;
      resolve();
    })
  })
};