import IDateModel from "./IDateModel";

export default interface IContact {
  id: number;
  title: string;
  value: string;
  vendor_id: number;
  created_at: IDateModel;
  updated_at: IDateModel;
}
