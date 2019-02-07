import {DateTime} from "./DateTime";
import {plainToClass, Type} from "class-transformer";
import {Contact} from "./Contact";
import {Component as ComponentModel, ComponentCollection} from "./Component";

export interface VendorScheme {
  id: number | null;
  name: string | null;
  components_count: number | null;
  components_cost: number | null;
  note: string | null;
  components: ComponentCollection | null;
  contacts: Contact[] | null | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  deleted_at: DateTime | null;
}

export class Vendor implements VendorScheme {
  id: number | null = null;
  name: string | null = null;
  note: string | null = null;
  components_cost: number | null = null;
  components_count: number | null = null;
  @Type(() => ComponentModel) components: ComponentCollection | null = null;
  @Type(() => Contact) contacts: Contact[] | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) deleted_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
}

export class VendorCollection extends Array<Vendor> {
}

export const createVendorModel = (vendor: VendorScheme): Vendor => plainToClass(Vendor, vendor);
export const defaultVendorModel: VendorScheme = {
  components: null,
  components_cost: null,
  components_count: null,
  contacts: null,
  created_at: null,
  deleted_at: null,
  id: null,
  name: null,
  note: null,
  updated_at: null
};
