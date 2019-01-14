import Model from "./Model";
import DateModel from "./DateModel";

export default class Contact extends Model {
  private _id: number = 0;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _title: string = '';

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _value: string = '';

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  private _vendor_id: number = 0;

  get vendor_id(): number {
    return this._vendor_id;
  }

  set vendor_id(value: number) {
    this._vendor_id = value;
  }

  private _created_at: DateModel = new DateModel();

  get created_at(): DateModel {
    return this._created_at;
  }

  set created_at(value: DateModel) {
    this._created_at = new DateModel(value);
  }

  private _updated_at: DateModel = new DateModel();

  get updated_at(): DateModel {
    return this._updated_at;
  }

  set updated_at(value: DateModel) {
    this._updated_at = new DateModel(value);
  }
}
