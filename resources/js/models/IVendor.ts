import IContact from "./IContact";
import IDateModel from "./IDateModel";
import IComponent from "./IComponent";

export default interface IVendor {
  // Required
  name: string;

  // Optional
  id?: number;
  components_count?: number;
  components_cost?: number;
  created_at?: IDateModel;
  note?: string;
  components?: IComponent[];
  contacts?: IContact[] | null;
  updated_at?: IDateModel;
  deleted_at?: IDateModel;
}
