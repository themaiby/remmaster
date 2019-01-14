export default interface ITableParams<Filter> {
  filter: Filter | null;
  page: number;
  descending: boolean;
  rowsPerPage: number;
  sortBy: string;
}

// Filter fields for vendors page
export interface IVendorsFilter {
  name: string;
  components: number[];
  createdAt: {
    min: string,
    max: string
  };
}
