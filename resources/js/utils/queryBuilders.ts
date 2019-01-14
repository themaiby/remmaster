import TableParams, {IVendorsFilter} from "../models/ITableParams";

// Generate query string vor vendors index page
export const buildVendorsQuery =
  ({rowsPerPage, page, sortBy, descending, filter}: TableParams<IVendorsFilter>): object => {
    // Init query object
    let query: object = {
      perPage: rowsPerPage,
      page: page,
      sort: sortBy,
      direction: descending ? 'desc' : 'asc'
    };

    // Add filter if it present (custom for every page)
    if (filter) query = {
      ...query,
      name: filter.name,
      components: filter.components,
      createdAt: [filter.createdAt.min, filter.createdAt.max],
    };

    return query;
};
