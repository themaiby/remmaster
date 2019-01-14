import IDateModel from "./IDateModel";

export default interface IRole {
  id: number;
  name: string;
  created_at: IDateModel;
  updated_at: IDateModel;
}
