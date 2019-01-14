import IMeta from "./IMeta";

export default interface IResponse<T> {
  data: T;
  meta: IMeta;
}
