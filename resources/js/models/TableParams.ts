export class TableParams {
  page: number = 1;
  descending: boolean = false;
  sortBy: string = '';
  private perPageCount: number = 5;
  private perPageVariable: string = 'per_page';
  rowsPerPage: number = Number(localStorage.getItem(this.perPageVariable)) || this.perPageCount;

  constructor(parameters?: { page: number, descending: boolean, rowsPerPage: number, sortBy: string }) {
    if (parameters) {
      let {page, descending, rowsPerPage, sortBy} = parameters;
      this.page = page;
      this.descending = descending;
      this.rowsPerPage = rowsPerPage;
      this.sortBy = sortBy;
      localStorage.setItem(this.perPageVariable, rowsPerPage.toString());
    }
  }
}
