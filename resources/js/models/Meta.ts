import Model from "./Model";

export default class Meta extends Model {
    private _current_page: number = 0;
    private _from: number = 0;
    private _last_page: number = 0;
    private _path: string = '';
    private _per_page: number = 0;
    private _to: number = 0;
    private _total: number = 0;

    get current_page(): number {
        return this._current_page;
    }

    set current_page(value: number) {
        this._current_page = value;
    }

    get from(): number {
        return this._from;
    }

    set from(value: number) {
        this._from = value;
    }

    get last_page(): number {
        return this._last_page;
    }

    set last_page(value: number) {
        this._last_page = value;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    get per_page(): number {
        return this._per_page;
    }

    set per_page(value: number) {
        this._per_page = value;
    }

    get to(): number {
        return this._to;
    }

    set to(value: number) {
        this._to = value;
    }

    get total(): number {
        return this._total;
    }

    set total(value: number) {
        this._total = value;
    }
}
