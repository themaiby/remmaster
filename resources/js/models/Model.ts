import {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import IResponse from "../interfaces/IResponse";
import {http} from "../plugins/axios";

function createInstance<T extends Model>(classInstance: new () => T): T {
  return new classInstance();
}

export class Model {
  protected paths: { all: string } = {all: 'parent_model'};

  static async all<T extends Model>(this: new() => T): Promise<IResponse<T>> {
    const localInstance = createInstance(this);
    try {
      const res: AxiosResponse<IResponse<T>> = await http.get(localInstance.paths.all);
      return res.data;
    } catch (e) {
      const err: AxiosError = e;
      throw err;
    }
  }
}

export class TUser extends Model {
  id: number | null = null;
  protected paths: { all: string } = {all: 'vendorss'};
}
