import {DateTime} from "./DateTime";
import {Type} from "class-transformer";

export class Role {
  static readonly Administrator: string = 'Admin';
  static readonly User: string = 'User';

  id: number = 0;
  name: string = '';
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();
}

