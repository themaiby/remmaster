import {plainToClass, Type} from "class-transformer";
import {DateTime} from "./DateTime";
import {Role} from "./Role";
import {Permission, PermissionCollection} from "./Permission";

export interface UserScheme {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  permissions: PermissionCollection | null;
  roles: Role[] | null;
  email_verified_at: DateTime | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  deleted_at: DateTime | null;
}

export class User implements UserScheme {
  /* Primitive types */
  id: number | null = null;
  first_name: string | null = null;
  last_name: string | null = null;
  email: string | null = null;

  /* Nested types */
  @Type(() => Permission) permissions: PermissionCollection | null = null;
  @Type(() => Role) roles: Role[] | null = null;
  @Type(() => DateTime) email_verified_at: DateTime | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
  @Type(() => DateTime) deleted_at: DateTime | null = null;

  can = (action: string): boolean => {
    if (this.isAdmin()) return true;
    return !this.permissions ? false : this.permissions.hasName(action);
  };
  hasRole = (name: string): boolean => (!this.roles ? false : this.roles.some((role) => role.name === name));
  isAdmin = (): boolean => (this.hasRole(Role.Administrator));
}

export const createUserModel = (user: UserScheme): User => plainToClass(User, user);

// For initial data in store
export const defaultUserModel: UserScheme = {
  id: null,
  first_name: null,
  last_name: null,
  email: null,
  permissions: null,
  roles: null,
  email_verified_at: null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
};
