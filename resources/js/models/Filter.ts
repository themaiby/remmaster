export namespace Filter {
  export class Vendor {
    name: string;
    componentsMin: number;
    componentsMax: number;
    createdAtMin: string;
    createdAtMax: string;

    constructor(parameters?: Filter.Vendor) {
      if (parameters) {
        let {name, componentsMin, componentsMax, createdAtMin, createdAtMax} = parameters;
        this.name = name;
        this.componentsMin = componentsMin;
        this.componentsMax = componentsMax;
        this.createdAtMin = createdAtMin;
        this.createdAtMax = createdAtMax;
      }
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


    constructor(parameters?: { categories: number[], article: string, title: string, countMin: number, countMax: number, costMin: number, costMax: number, vendor: string, createdAtMin: string, createdAtMax: string, withDeleted: boolean }) {
      if (parameters) {
        let {categories, article, title, countMin, countMax, costMin, costMax, vendor, createdAtMin, createdAtMax, withDeleted} = parameters;
        this.categories = categories;
        this.article = article;
        this.title = title;
        this.countMin = countMin;
        this.countMax = countMax;
        this.costMin = costMin;
        this.costMax = costMax;
        this.vendor = vendor;
        this.createdAtMin = createdAtMin;
        this.createdAtMax = createdAtMax;
        this.withDeleted = withDeleted;
      }
    }
  }
}
