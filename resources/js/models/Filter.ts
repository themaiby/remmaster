import {plainToClass} from "class-transformer";

export namespace Filter {
  export class Vendor {
    name: string;
    componentsMin: number;
    componentsMax: number;
    createdAtMin: string;
    createdAtMax: string;

    static set(vendorFilter: Vendor) {
      return plainToClass(Vendor, vendorFilter);
    }
  }

  export class Component {
    categories: number[];
    article: string;
    title: string;
    countMin: number;
    countMax: number;
    costMin: number;
    costMax: number;
    vendor: string;
    createdAtMin: string;
    createdAtMax: string;
    withDeleted: boolean;

    static set(componentFilter: Component) {
      return plainToClass(Component, componentFilter);
    }
  }
}
