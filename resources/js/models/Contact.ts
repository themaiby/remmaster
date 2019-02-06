import {DateTime} from "./DateTime";
import {plainToClass, Type} from "class-transformer";

export interface ContactScheme {
  id: number | null;
  title: string | null;
  value: string | null;
  icon: string | null;
  vendor_id: number | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export class Contact implements ContactScheme {
  id: number | null = null;
  title: string | null = null;
  value: string | null = null;
  icon: string | null = null;
  vendor_id: number | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
}
export const createContactModel = (contact: Contact) => plainToClass(Contact, contact);
export const defaultContactModel: ContactScheme = {
  created_at: null,
  icon: null,
  id: null,
  title: null,
  updated_at: null,
  value: null,
  vendor_id: null
};
