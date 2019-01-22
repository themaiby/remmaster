import TableParams from "../models/ITableParams";

export class QueryBuilder<T> {
  private readonly _p: TableParams<T>;

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
