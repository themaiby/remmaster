import {DateTime} from "./DateTime";
import {Type} from "class-transformer";

export class Permission {
  id: number = 0;
  name: string = '';
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();
}
