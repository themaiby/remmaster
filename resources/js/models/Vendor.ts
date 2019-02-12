import {plainToClass, Type} from "class-transformer";
import {Contact} from "./Contact";
import {DateTime} from "./DateTime";
import {Component as ComponentModel} from "./Component";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";

export class Vendor {

  id: number = 0;
  name: string = '';
  note: string = '';
  components_cost: number = 0;
  components_count: number = 0;
  @Type(() => ComponentModel) components: ComponentModel[] = [];
  @Type(() => Contact) contacts: Contact[] = [];
  @Type(() => DateTime) created_at: DateTime = new DateTime();
  @Type(() => DateTime) deleted_at: DateTime = new DateTime();
  @Type(() => DateTime) updated_at: DateTime = new DateTime();

  /**
   * @param identifier
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
   * @param query
   */
  static async getAvailable(query?: {}): Promise<ResponseModel<Vendor[]>> {
    const res: AxiosResponse<ResponseScheme<Vendor[]>> = await http.get(`vendors/available`, {params: query});
    return new ResponseModel(res.data, Vendor);
  }

  /**
   * @param icon
   * @param title
   * @param value
   */
  public addContact(icon: string, title: string, value: string) {
    this.contacts = [...this.contacts, plainToClass(Contact, {icon, title, value})];
  }

  /**
   * @param index
   */
  public removeContact(index: number) {
    if (this.contacts) this.contacts = this.contacts.filter((contact, idx) => idx !== index);
  }
}

