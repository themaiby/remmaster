import Model from "./Model";

export default class TableParams<Filter> extends Model {
    filter: Filter | null = null;
    page: number = 1;
    descending: boolean = false;
    rowsPerPage: number = Number(localStorage.getItem('rowsPerPage') || 5);
    sortBy: string = '';
}
