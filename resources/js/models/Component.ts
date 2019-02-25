import {DateTime} from "./DateTime";
import {Vendor} from "./Vendor";
import {ComponentCategory} from "./ComponentCategory";
import {Type} from "class-transformer";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";
import {ComponentPivot} from "./ComponentPivot";

export class Component {
  id: number = 0;
  title: string = '';
  article: string = '';
  category_id: number = ComponentCategory.ROOT_CATEGORY;
  cost: number = 0;
  count: number = 0;
  vendor_id: number = 0;
  component_id: number = 0; /* for create request */
  @Type(() => ComponentPivot) pivot: ComponentPivot = new ComponentPivot(); /* count in order */
  @Type(() => ComponentCategory) category: ComponentCategory = new ComponentCategory();
  @Type(() => Vendor) vendor: Vendor = new Vendor();
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) deleted_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();

  /**
   * @param query
   */
  static async all(query?: {}): Promise<ResponseModel<Component[]>> {
    const res: AxiosResponse<ResponseScheme<Component[]>> = await http.get(`components`, {params: query});
    return new ResponseModel(res.data, Component);
  }

  /**
   * @param component
   */
  static async create(component: Component): Promise<ResponseModel<Component>> {
    const res: AxiosResponse<ResponseScheme<Component>> = await http.post(`components`, component);
    return new ResponseModel(res.data, Component);
  }

  /**
   * @param identifier
   */
  static async get(identifier: number): Promise<ResponseModel<Component>> {
    const res: AxiosResponse<ResponseScheme<Component>> = await http.get(`components/${identifier}`);
    return new ResponseModel(res.data, Component);
  }

  /**
   * @param component
   */
  static async update(component: Component): Promise<ResponseModel<Component>> {
    const res: AxiosResponse<ResponseScheme<Component>> = await http.put(`components/${component.id}`, component);
    return new ResponseModel(res.data, Component);
  }

  /**
   * @param identifier
   */
  static async delete(identifier: number): Promise<ResponseModel<{ new(): { message?: string, errors?: [] } }>> {
    const res: AxiosResponse<ResponseModel<{ new(): { message?: string, errors?: [] } }>> = await http.delete(`components/${identifier}`);
    return new ResponseModel(res.data, class {
      message?: string;
      errors?: [];
    });
  }

  getInOrderCount() {
    return this.pivot.count;
  }
}

