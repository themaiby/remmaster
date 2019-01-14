import Model from "./Model";

export default class AppMessage extends Model {
  private _message: string = '';

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  private _errors: object[] = [];

  get errors(): object[] {
    return this._errors;
  }

  set errors(value: object[]) {
    this._errors = value;
  }
}
