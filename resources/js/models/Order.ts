import {User} from "./User";
import {DateTime} from "./DateTime";
import {Type} from "class-transformer";
import {OrderType} from "./OrderType";
import {OrderStatus} from "./OrderStatus";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";
import {OrderWork} from "./OrderWork";
import {Component as ComponentModel} from "./Component";

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
  status_id: number = 0;
  order_type_id: number = 0;

  @Type(() => User) user: User = new User();
  @Type(() => OrderWork) works: OrderWork[] = [];
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();
  @Type(() => DateTime) deleted_at: DateTime = new DateTime();
  @Type(() => DateTime) complete_date: DateTime | string = new DateTime();
  @Type(() => OrderType) type: OrderType = new OrderType();
  @Type(() => OrderStatus) status: OrderStatus = new OrderStatus();
  @Type(() => ComponentModel) components: ComponentModel[] = [];

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

  /**
   * @param order
   */
  static async create(order: Order): Promise<ResponseModel<Order>> {
    const res: AxiosResponse<ResponseScheme<Order>> = await http.post(`orders`, order);
    return new ResponseModel(res.data, Order);
  }
}
