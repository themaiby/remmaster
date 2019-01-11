import Model from "./Model";

export default class DateModel extends Model {
    private _date: string = '';

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    private _timezone_type: number = 0;

    get timezone_type(): number {
        return this._timezone_type;
    }

    set timezone_type(value: number) {
        this._timezone_type = value;
    }

    private _timezone: string = '';

    get timezone(): string {
        return this._timezone;
    }

    set timezone(value: string) {
        this._timezone = value;
    }
}
