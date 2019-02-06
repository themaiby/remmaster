import IPermission from "./IPermission";
import IRole from "./IRole";
import IDateModel from "./IDateModel";

export default interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  permissions: IPermission[];
  roles: IRole[];
  email_verified_at: IDateModel;
  created_at: IDateModel;
  updated_at: IDateModel;
  deleted_at: IDateModel;
}


