import IDateModel from "./IDateModel";

export default interface IContact {
  title: string;
  value: string;
  icon: string;

  id?: number;
  vendor_id?: number;
  created_at?: IDateModel;
  updated_at?: IDateModel;
}
