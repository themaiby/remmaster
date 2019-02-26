import {Type} from "class-transformer";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";
import {DateTime} from "./DateTime";
import {Response as ResponseModel, ResponseScheme} from "./Response";

export class OrderStatus {
  id: number = 0;
  title: string = '';
  opener: boolean = false;
  finisher: boolean = false;
  color: string = '';
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();

  /**
   * @param query
   */
  static async all(query?: {}): Promise<ResponseModel<OrderStatus[]>> {
    const res: AxiosResponse<ResponseScheme<OrderStatus[]>> = await http.get(`orders/statuses`, {params: query});
    return new ResponseModel(res.data, OrderStatus);
  }
}
