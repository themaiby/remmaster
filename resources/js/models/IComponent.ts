import IDateModel from "./IDateModel";
import IVendor from "./IVendor";

export default interface IComponent {
  article: string;
  title: string;
  count: number;
  cost: number;

  id?: number;
  vendor?: IVendor;
  vendor_id?: number;
  created_at?: IDateModel;
  updated_at?: IDateModel;
  deleted_at?: IDateModel;
}
