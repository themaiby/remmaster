import {plainToClass, Type} from "class-transformer";
import {DateTime} from "./DateTime";
import {Role, RoleCollection} from "./Role";
import {Permission, PermissionCollection} from "./Permission";

export class User {
  id: number | null = null;
  first_name: string | null = null;
  last_name: string | null = null;
  email: string | null = null;

  /* Nested types */
  @Type(() => Permission) permissions: PermissionCollection | null = null;
  @Type(() => Role) roles: RoleCollection | null = null;
  @Type(() => DateTime) email_verified_at: DateTime | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
  @Type(() => DateTime) deleted_at: DateTime | null = null;

  // Can the user do specified action (has permission)
  can(action: string): boolean {
    if (this.isAdmin()) return true; // Administrator has all permissions
    if (!this.permissions) return false; // empty - no permissions
    return this.permissions.some((permission) => permission.name === action);
  }

  hasRole(roleName: string): boolean {
    if (!this.roles) return false;
    return this.roles.some((role) => role.name === roleName);
  }

  isAdmin(): boolean {
    return this.hasRole('Admin') // todo: move to const
  }

}

export const createUserModel = (user: User): User => {
  return plainToClass(User, user);
};
