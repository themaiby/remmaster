import {DateTime} from "./DateTime";
import {Type} from "class-transformer";

export class Permission {
  id: number | null = null;
  name: string | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
}

export class PermissionCollection extends Array<Permission> {
  hasName(name: string): boolean {
    return this.some((permission) => permission.name === name);
  }
}

export const defaultPermissionModel: Permission = {
  id: null,
  name: null,
  created_at: null,
  updated_at: null,
};
