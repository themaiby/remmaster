import Model from "./Model";
import DateModel from "./DateModel";

export default class Permission extends Model {
  private _id: number = 0;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _name: string = '';

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
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
