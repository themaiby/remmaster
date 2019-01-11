import {AxiosResponse} from "axios";

export default class ApiResponse<T> {
    private _meta: object = {};
    private _data: T;

    constructor(axiosResponse: AxiosResponse) {
        this._data = axiosResponse.data.data;
        if (axiosResponse.data.meta) {
            this._meta = axiosResponse.data.meta;
        }
    }

    get meta(): object {
        return this._meta;
    }

    get data(): T {
        return this._data;
    }
}
