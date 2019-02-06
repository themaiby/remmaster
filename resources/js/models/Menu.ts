import {plainToClass, Type} from "class-transformer";

export interface MenuScheme {
  icon: string | null;
  routeName: string | null;
  text: string | null;
  ['icon-alt']: string | null;
  children?: MenuScheme | null;
}

export class Menu implements MenuScheme {
  "icon-alt": string | null = null;
  icon: string | null = null;
  routeName: string | null = null;
  text: string | null = null;
  @Type(() => Menu) children: Menu | null = null;
}

export const createMenuModel = (menu: MenuScheme) => plainToClass(Menu, menu);
export const defaultMenuModel: MenuScheme = {
  "icon-alt": null,
  children: null,
  icon: null,
  routeName: null,
  text: null
};
