import { SortParams } from '@models/sort-params.interface';

export interface QueryParams {
  pageIndex: number;
  searchValue: string;
  sortParams: SortParams;
}
