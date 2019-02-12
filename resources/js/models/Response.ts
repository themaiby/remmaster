import {ClassType} from "class-transformer/ClassTransformer";
import {Meta} from "./Meta";
import {plainToClass} from "class-transformer";

export interface ResponseScheme<T> {
  data: T | T[];
  meta: Meta;
  message: string;
  errors: [];
}

export class Response<T> implements ResponseScheme<T> {
  public data: T;
  public message: string;
  public meta: Meta;
  public errors: [];

  /**
   * @param res
   * @param mapResponseTo
   */
  constructor(res: ResponseScheme<T>, mapResponseTo: Function) {
    if (Array.isArray(res.data)) res.data = res.data.map(item => plainToClass(mapResponseTo as ClassType<T>, item));
    if (!Array.isArray(res)) this.data = plainToClass(mapResponseTo as ClassType<T>, res.data);

    this.meta = plainToClass(Meta, res.meta || {});
    this.message = res.message || '';
    this.errors = res.errors || [];
  }
}
