import {DateTime} from "./DateTime";
import {Type} from "class-transformer";

export class OrderWork {
  id: number = 0;
  title: string = '';
  cost: number = 0;
  @Type(() => Date) created_at: DateTime = new DateTime();
  @Type(() => Date) updated_at: DateTime = new DateTime();
}
