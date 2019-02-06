import {plainToClass, Type} from "class-transformer";
import {DateTime} from "./DateTime";
import {Role, RoleCollection} from "./Role";
import {Permission, PermissionCollection} from "./Permission";

export interface UserScheme {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  permissions: PermissionCollection | null;
  roles: RoleCollection | null;
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
  @Type(() => Role) roles: RoleCollection | null = null;
  @Type(() => DateTime) email_verified_at: DateTime | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
  @Type(() => DateTime) deleted_at: DateTime | null = null;

  /* Methods */
  can(action: string): boolean {
    return this.isAdmin() || !this.permissions ? false : this.permissions.hasName(action);
  }

  hasRole(role: string): boolean {
    return !this.roles ? false : this.roles.hasName(role);
  }

  isAdmin(): boolean {
    return this.hasRole(Role.Administrator);
  }
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
