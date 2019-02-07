import {ClassType} from "class-transformer/ClassTransformer";
import {Meta} from "./Meta";
import {plainToClass} from "class-transformer";

export interface ResponseScheme<T> {
  data: T | T[];
  meta: Meta;
  message: string;
  errors?: [];
}

export class Response<T> implements ResponseScheme<T> {
  public data: T | T[];
  public message: string;
  public meta: Meta;
  public errors: [];

  /**
   * Map received parameters to itself and create inherited classes.
   * Map class receives from caller and maps in constructor
   *
   * @param res
   * @param child
   */
  constructor(res: ResponseScheme<T>, child: Function) {
    /**
     * If we have multiple objects in data -> parse and create new instance for every
     */
    if (Array.isArray(res.data)) res.data = res.data.map(item => plainToClass(child as ClassType<T>, item));

    /*
    * When its only single data in response -> just map it to nested class
    */
    if (!Array.isArray(res)) this.data = plainToClass(child as ClassType<T>, res.data);

    /**
     * Meta must be present always in multiple object response
     * In single it will {null}
     */
    this.meta = plainToClass(Meta, res.meta);

    /**
     * Message can be received with 200 OK too
     */
    this.message = res.message || '';

    /**
     * Set errors if http code !== 200
     */
    res.errors ? this.errors = res.errors : false;
  }
}
