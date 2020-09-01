import { UNAUTHORIZED } from 'http-status-codes';

export default class Unauthorized extends Error {
  private code: number;
  constructor(message?: string) {
    super();
    this.code = UNAUTHORIZED;
    this.message = message || 'User is not authorized.';
  }
};
