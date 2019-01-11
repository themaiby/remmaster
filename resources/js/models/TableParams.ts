import Model from "./Model";

export default class TableParams extends Model {
    filter?: object = {};
    page: number = 1;
    descending: boolean = false;
    rowsPerPage: number = Number(localStorage.getItem('rowsPerPage') || 5);
    sortBy: string = '';
}
