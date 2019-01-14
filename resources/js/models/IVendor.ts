import IContact from "./IContact";
import IDateModel from "./IDateModel";
import IComponent from "./IComponent";

export default interface IVendor {
  // Required
  id: number;
  name: string;
  components_count: number;
  components_cost: number;
  created_at: IDateModel;

  // Optional
  note?: string;
  components?: IComponent[];
  contacts?: IContact[];
  updated_at?: IDateModel;
  deleted_at?: IDateModel;
}
