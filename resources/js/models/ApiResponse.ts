import {AxiosResponse} from "axios";

export default class ApiResponse<T> {
  constructor(axiosResponse: AxiosResponse) {
    this._data = axiosResponse.data.data;
    if (axiosResponse.data.meta) {
      this._meta = axiosResponse.data.meta;
    }
  }

  private _meta: object = {};

  get meta(): object {
    return this._meta;
  }

  private _data: T;

  get data(): T {
    return this._data;
  }
}
