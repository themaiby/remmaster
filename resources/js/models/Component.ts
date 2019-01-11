import Model from "./Model";
import DateModel from "./DateModel";
import Vendor from "./Vendor";

export default class Component extends Model {
    private _id: number = 0;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _article: string = '';

    get article(): string {
        return this._article;
    }

    set article(value: string) {
        this._article = value;
    }

    private _title: string = '';

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    private _count: number = 0;

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
    }

    private _vendor_id: number = 0;

    get vendor_id(): number {
        return this._vendor_id;
    }

    set vendor_id(value: number) {
        this._vendor_id = value;
    }

    private _cost: number = 0;

    get cost(): number {
        return this._cost;
    }

    set cost(value: number) {
        this._cost = value;
    }

    private _vendor: Vendor = new Vendor();

    get vendor(): Vendor {
        return this._vendor;
    }

    set vendor(value: Vendor) {
        this._vendor = value;
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
