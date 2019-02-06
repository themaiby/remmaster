import {DateTime} from "./DateTime";
import {Type} from "class-transformer";

export class Role {
  static readonly Administrator: string = 'Admin';
  static readonly User: string = 'User';

  id: number | null = null;
  name: string | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
}

