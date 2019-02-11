import {Type} from "class-transformer";
import {DateTime} from "./DateTime";
import {Role} from "./Role";
import {Permission, PermissionCollection} from "./Permission";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";

export class User {
  /* Primitive types */
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  timezone: string = 'UTC';

  /* Nested types */
  @Type(() => Permission) permissions: PermissionCollection;
  @Type(() => Role) roles: Role[];
  @Type(() => DateTime) email_verified_at: DateTime;
  @Type(() => DateTime) created_at: DateTime;
  @Type(() => DateTime) updated_at: DateTime;
  @Type(() => DateTime) deleted_at: DateTime;

  /**
   * Get authorized user
   */
  static async getCurrent(): Promise<ResponseModel<User>> {
    const res: AxiosResponse<ResponseScheme<User>> = await http.get(`me`);
    return new ResponseModel(res.data, User);
  }

  static async login(credentials: { email: string, password: string }) {
    await http.post('login', credentials);
    return true;
  }

  can = (action: string): boolean => {
    if (this.isAdmin()) return true;
    return !this.permissions ? false : this.permissions.hasName(action);
  };

  hasRole = (name: string): boolean => (!this.roles ? false : this.roles.some((role) => role.name === name));

  isAdmin = (): boolean => (this.hasRole(Role.Administrator));
}

