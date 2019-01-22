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
  article?: string;
  title?: string;
  countMin?: number;
  countMax?: number;
  createdAtMin?: string;
  createdAtMax?: string;
  updatedAtMin?: string;
  updatedAtMax?: string;
  withTrashed?: boolean;
}
