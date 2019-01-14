import IDateModel from "./IDateModel";
import IVendor from "./IVendor";

export default interface IComponent {
  id: number;
  article: string;
  title: string;
  count: number;
  vendor_id: number;
  cost: number;
  vendor: IVendor;
  created_at: IDateModel;
  updated_at: IDateModel;
  deleted_at: IDateModel;
}
