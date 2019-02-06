export default interface ITableParams<T> {
  filter: T | null;
  page: number;
  descending: boolean;
  rowsPerPage: number;
  sortBy: string;
}


export interface IVendorsFilter {
  name?: string;
  componentsMin?: number | undefined;
  componentsMax?: number | undefined;
  createdAtMin?: string;
  createdAtMax?: string;
}

export interface IComponentsFilter {
  categories?: number[];
  article?: string;
  title?: string;
  countMin?: number;
  countMax?: number;
  costMin?: number;
  costMax?: number;
  vendor?: string;
  createdAtMin?: string;
  createdAtMax?: string;
  withDeleted?: boolean;
}
