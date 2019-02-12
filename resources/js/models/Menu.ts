import {Type} from "class-transformer";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";

export class Menu {
  "icon-alt": string = '';
  icon: string = '';
  routeName: string = '';
  text: string = '';
  @Type(() => Menu) children: Menu | null = null; // null default to prevent n(O)

  /**
   * Get application global menu for current user
   */
  static async get(): Promise<ResponseModel<Menu[]>> {
    const res: AxiosResponse<ResponseScheme<Menu[]>> = await http.get(`menu`);
    return new ResponseModel(res.data, Menu);
  }
}
