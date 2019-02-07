import {Meta} from "../models/Meta";

export default interface IResponse<T> {
  data: T | T[];
  meta: Meta;
  message?: string;
}
