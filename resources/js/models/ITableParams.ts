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
