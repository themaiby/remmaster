import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";

export class ComponentCategory {
  id: number;
  title: string;

  static async getAvailable(query?: {}): Promise<ResponseModel<ComponentCategory[]>> {
    const res: AxiosResponse<ResponseScheme<ComponentCategory[]>> = await http.get(`categories/available`, {params: query});
    return new ResponseModel(res.data, ComponentCategory);
  }
}
