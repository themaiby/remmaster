import {DateTime} from "./DateTime";
import {Vendor} from "./Vendor";
import {ComponentCategory} from "./ComponentCategory";
import {plainToClass, Type} from "class-transformer";

export interface ComponentScheme {
  id: number | null;
  article: string | null;
  title: string | null;
  count: number | null;
  cost: number | null;
  category_id: number | null;
  vendor_id: number | null;
  category: ComponentCategory | null,
  vendor: Vendor | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  deleted_at: DateTime | null;
}

export class Component implements ComponentScheme {
  id: number | null = null;
  title: string | null = null;
  article: string | null = null;
  category_id: number | null = null;
  cost: number | null = null;
  count: number | null = null;
  vendor_id: number | null = null;
  @Type(() => ComponentCategory) category: ComponentCategory | null = null;
  @Type(() => Vendor) vendor: Vendor | null = null;
  @Type(() => DateTime) created_at: DateTime | null = null;
  @Type(() => DateTime) deleted_at: DateTime | null = null;
  @Type(() => DateTime) updated_at: DateTime | null = null;
}

export class ComponentCollection extends Array<Component> {
}

export const createComponentModel = (component: ComponentScheme): Component => plainToClass(Component, component);
export const defaultComponentModel: ComponentScheme = {
  article: null,
  category: null,
  category_id: null,
  cost: null,
  count: null,
  created_at: null,
  deleted_at: null,
  id: null,
  title: null,
  updated_at: null,
  vendor: null,
  vendor_id: null
};
