import {DateTime} from "./DateTime";
import {Type} from "class-transformer";

export class Role {
  id: number | null = null;
  name: string | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
}

export class RoleCollection extends Array<Role> {
}
