export default class ValidationError extends Error {
  private code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
};
