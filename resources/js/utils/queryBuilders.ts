import TableParams from "../models/ITableParams";

// Generate query string vor vendors index page
/*export const buildQuery =
  ({rowsPerPage, page, sortBy, descending, filter}: TableParams): object => {
    // Init query object
    let query = {
      perPage: rowsPerPage,
      page: page,
      sort: sortBy,
      direction: descending ? 'desc' : 'asc'
    };

    // Add filter if it present (custom for every page)
    if (filter) query = {...query, ...filter};
    return query;
};*/

export class QueryBuilder<T> {
  private _p: TableParams<T>;

  constructor(params: TableParams<T>) {
    this._p = params;
  }

  build() {
    const p = this._p;

    // Init query object
    let query = {
      perPage: p.rowsPerPage,
      page: p.page,
      sort: p.sortBy,
      direction: p.descending ? 'desc' : 'asc'
    };

    if (p.filter) query = {
      ...query,
      ...p.filter
    };

    return query;
  }
}
