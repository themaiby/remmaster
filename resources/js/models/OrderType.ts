import {DateTime} from "./DateTime";
import {Type} from "class-transformer";

export class OrderType {
  id: number = 0;
  title: string = '';
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();
  @Type(() => DateTime) deleted_at: DateTime = new DateTime();
}
