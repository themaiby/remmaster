// Generate query string vor vendors index page
import TableParams from "../models/TableParams";
import {VendorsFilter} from "../store/modules/VendorsStore";

export const buildVendorsQuery = ({rowsPerPage, page, sortBy, descending, filter}: TableParams<VendorsFilter>): object => {
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
