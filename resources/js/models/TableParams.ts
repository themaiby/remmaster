import {Exclude, plainToClass} from "class-transformer";

export class TableParams {
  page: number = 1;
  descending: boolean = false;
  sortBy: string = '';
  @Exclude() private perPageCount: number = 5;
  @Exclude() private perPageVariable: string = 'per_page';
  perPage: number = Number(localStorage.getItem(this.perPageVariable)) || this.perPageCount;

  get rowsPerPage() {
    return this.perPage;
  }

  set rowsPerPage(value: number) {
    this.perPage = value;
  }

  set(params: TableParams) {
    return plainToClass(TableParams, params);
  }
}
