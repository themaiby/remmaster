import {DateTime} from "./DateTime";
import {Type} from "class-transformer";

export class OrderStatus {
  id: number = 0;
  title: string = '';
  opener: boolean = false;
  finisher: boolean = false;
  color: string = '';
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();
  @Type(() => DateTime) deleted_at: DateTime = new DateTime();
}
