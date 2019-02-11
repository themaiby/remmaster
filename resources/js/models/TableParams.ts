export class TableParams {
  page: number = 1;
  descending: boolean = false;
  rowsPerPage: number = Number(localStorage.getItem('vendorsPerPage')) || 5;
  sortBy: string = '';


  constructor(parameters?: { page: number, descending: boolean, rowsPerPage: number, sortBy: string }) {
    if (parameters) {
      let {page, descending, rowsPerPage, sortBy} = parameters;
      this.page = page;
      this.descending = descending;
      this.rowsPerPage = rowsPerPage;
      this.sortBy = sortBy;
      localStorage.setItem('vendorsPerPage', rowsPerPage.toString());
    }
  }
}
