import Model from "./Model";
import Component from './/Component';
import Contact from "./Contact";
import DateModel from "./DateModel";

export default class Vendor extends Model {
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

  private _note: string = '';

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
  }

  private _components: Component[] = [];

  get components(): Component[] {
    return this._components;
  }

  set components(value: Component[]) {
    this._components = value.map((item) => {
      return new Component(item);
    });
  }

  private _contacts: Contact[] = [];

  get contacts(): Contact[] {
    return this._contacts;
  }

  set contacts(value: Contact[]) {
    this._contacts = value.map((item) => {
      return new Contact(item);
    });
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

  private _deleted_at: DateModel = new DateModel();

  get deleted_at(): DateModel {
    return this._deleted_at;
  }

  set deleted_at(value: DateModel) {
    this._deleted_at = new DateModel(value);
  }
}
