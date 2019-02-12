import {User} from "./User";
import {DateTime} from "./DateTime";
import {Type} from "class-transformer";
import {OrderType} from "./OrderType";
import {OrderStatus} from "./OrderStatus";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";

export class Order {
  id: number = 0;
  urgent: boolean = false;
  breakage: string = '';
  comment: string = '';
  client_name: string = '';
  client_number: string = '';
  client_email: string = '';
  client_note: string = '';
  device_name: string = '';
  device_imei: string = '';
  device_visual: string = '';
  device_note: string = '';

  @Type(() => User) user: User = new User();
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();
  @Type(() => DateTime) deleted_at: DateTime = new DateTime();
  @Type(() => DateTime) complete_date: DateTime = new DateTime();
  @Type(() => OrderType) type: OrderType = new OrderType();
  @Type(() => OrderStatus) status: OrderStatus = new OrderStatus();

  /**
   * @param query
   */
  static async all(query?: {}): Promise<ResponseModel<Order[]>> {
    const res: AxiosResponse<ResponseScheme<Order[]>> = await http.get(`orders`, {params: query});
    return new ResponseModel(res.data, Order);
  }

  /**
   * @param identifier
   */
  static async get(identifier: number): Promise<ResponseModel<Order>> {
    const res: AxiosResponse<ResponseScheme<Order>> = await http.get(`orders/${identifier}`);
    return new ResponseModel(res.data, Order);
  }
}
