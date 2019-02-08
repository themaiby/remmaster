import {Type} from "class-transformer";

import {AxiosResponse} from "axios";
import {http} from "../plugins/axios";
import {Contact} from "./Contact";
import {DateTime} from "./DateTime";
import {Response as ResponseModel, ResponseScheme} from "./Response";
import {Component, Component as ComponentModel, ComponentCollection} from "./Component";

export interface VendorScheme {
  id: number;
  name: string;
  components_count: number;
  components_cost: number;
  note: string;
  components: Component[];
  contacts: Contact[];
  created_at: DateTime;
  updated_at: DateTime;
  deleted_at: DateTime;
}

export class Vendor implements VendorScheme {
  id: number;
  name: string;
  note: string;
  components_cost: number;
  components_count: number;

  /**
   * Mappers
   */
  @Type(() => ComponentModel) components: ComponentCollection;
  @Type(() => Contact) contacts: Contact[];
  @Type(() => DateTime) created_at: DateTime;
  @Type(() => DateTime) deleted_at: DateTime;
  @Type(() => DateTime) updated_at: DateTime;

  /**
   * Get single Vendor
   * @param id
   */
  static async get(id: number): Promise<ResponseModel<Vendor>> {
    const v: AxiosResponse<ResponseScheme<Vendor>> = await http.get(`vendors/${id}`);
    return new ResponseModel<Vendor>(v.data, Vendor);
  }

  /**
   * Get vendors dependencies from query
   * @param query
   */
  static async all(query?: {}): Promise<ResponseModel<Vendor[]>> {
    const v: AxiosResponse<ResponseScheme<Vendor[]>> = await http.get(`vendors`, {params: query});
    return new ResponseModel<Vendor[]>(v.data, Vendor);
  }
}

