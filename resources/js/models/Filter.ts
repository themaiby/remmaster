export namespace Filter {
  export class Vendor {
    name: string;
    componentsMin: number;
    componentsMax: number;
    createdAtMin: string;
    createdAtMax: string;

    constructor(parameters: { name: string, componentsMin: number, componentsMax: number, createdAtMin: string, createdAtMax: string }) {
      let {name, componentsMin, componentsMax, createdAtMin, createdAtMax} = parameters;
      this.name = name;
      this.componentsMin = componentsMin;
      this.componentsMax = componentsMax;
      this.createdAtMin = createdAtMin;
      this.createdAtMax = createdAtMax;
    }
  }
}
