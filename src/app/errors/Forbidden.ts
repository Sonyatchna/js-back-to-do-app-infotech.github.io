import { FORBIDDEN } from 'http-status-codes';

export default class Forbidden extends Error {
  private code: number;
  constructor(message?: string) {
    super();
    this.code = FORBIDDEN;
    this.message = message || 'User has no permissions.';
  }
};
