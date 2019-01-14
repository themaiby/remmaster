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


/*   // Can the user do specified action (has permission)
  can(action: string): boolean {
    if (this.isAdmin()) return true; // Administrator has all permissions

    if (!this.permissions) return false; // empty - no permissions

    return this.permissions.some((permission) => {
      return permission.name === action
    })
  }

  hasRole(roleName: string): boolean {
    if (!this.roles) return false;
    return this.roles.some((role) => {
      return role.name === roleName
    })
  }

  isAdmin(): boolean {
    return this.hasRole(IRole.ADMIN)
  }

  */
