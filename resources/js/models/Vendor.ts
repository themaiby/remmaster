import {Type} from "class-transformer";
import {Contact} from "./Contact";
import {DateTime} from "./DateTime";
import {Component as ComponentModel, ComponentCollection} from "./Component";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";
import {vendorsStore} from "../store/modules/VendorsStore";

export class Vendor {
  id: number;
  name: string;
  note: string;
  components_cost: number;
  components_count: number;
  @Type(() => ComponentModel) components: ComponentCollection;
  @Type(() => Contact) contacts: Contact[];
  @Type(() => DateTime) created_at: DateTime;
  @Type(() => DateTime) deleted_at: DateTime;
  @Type(() => DateTime) updated_at: DateTime;

  /**
   * @param identifier
   * @param query
   */
  static async get(identifier: number): Promise<ResponseModel<Vendor>> {
    const res: AxiosResponse<ResponseScheme<Vendor>> = await http.get(`vendors/${identifier}`);
    return new ResponseModel(res.data, Vendor);
  }

  /**
   * @param query
   */
  static async all(query?: {}): Promise<ResponseModel<Vendor[]>> {
    const res: AxiosResponse<ResponseScheme<Vendor[]>> = await http.get(`vendors`, {params: query});
    return new ResponseModel(res.data, Vendor);
  }

  /**
   * @param vendor
   */
  static async create(vendor: Vendor): Promise<ResponseModel<Vendor>> {
    const res: AxiosResponse<ResponseScheme<Vendor>> = await http.post(`vendors`, vendor);
    return new ResponseModel(res.data, Vendor);
  }

  /**
   * @param identifier
   */
  static async delete(identifier: number): Promise<ResponseModel<{ new(): { message?: string, errors?: [] } }>> {
    const res: AxiosResponse<ResponseModel<{ new(): { message?: string, errors?: [] } }>> = await http.delete(`vendors/${identifier}`);
    return new ResponseModel(res.data, class {
      message?: string;
      errors?: [];
    });
  }

  /**
   * @param vendor
   */
  static async update(vendor: Vendor): Promise<ResponseModel<Vendor>> {
    const res: AxiosResponse<ResponseScheme<Vendor>> = await http.put(`vendors/${vendor.id}`, vendor);
    return new ResponseModel(res.data, Vendor);
  }

  /**
   * Get vendor from local data
   * @param id
   */
  static find(id: number): Vendor | undefined {
    return vendorsStore.vendors.find(vendor => vendor.id === id)
  }
}

