import {OrderStatus} from "./OrderStatus";
import {User} from "./User";
import {Type} from "class-transformer";
import {DateTime} from "./DateTime";

export class StatusHistory {
  @Type(() => OrderStatus) status_old: OrderStatus = new OrderStatus();
  @Type(() => OrderStatus) status_new: OrderStatus = new OrderStatus();
  @Type(() => User) user: User = new User();
  @Type(() => DateTime) created_at: DateTime = new DateTime();
}
