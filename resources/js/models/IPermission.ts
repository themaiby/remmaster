import IDateModel from "./IDateModel";

export default interface IPermission {
  id: number;
  name: string;
  created_at: IDateModel;
  updated_at: IDateModel;
}
