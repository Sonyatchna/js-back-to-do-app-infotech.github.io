import { NOT_FOUND } from 'http-status-codes';

export default class EntityNotFound extends Error {
  private code: number;
  constructor(message: string) {
    super(message);
    this.code = NOT_FOUND;
  }
};
