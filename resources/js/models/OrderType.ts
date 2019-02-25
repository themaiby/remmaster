import {DateTime} from "./DateTime";
import {Type} from "class-transformer";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";

export class OrderType {
  id: number = 0;
  title: string = '';
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();
  @Type(() => DateTime) deleted_at: DateTime = new DateTime();

  /**
   * @param query
   */
  static async all(query?: {}): Promise<ResponseModel<OrderType[]>> {
    const res: AxiosResponse<ResponseScheme<OrderType[]>> = await http.get(`orders/types`, {params: query});
    return new ResponseModel(res.data, OrderType);
  }
}
