export interface ComponentCategoryScheme {
  id: number | null;
  title: string | null;
}

export class ComponentCategory implements ComponentCategoryScheme {
  id: number | null = null;
  title: string | null = null;
}
