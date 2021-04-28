export interface SortParams {
  columnName: string;
  sortingOrder: SortingOrder;
}

export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc'
}
