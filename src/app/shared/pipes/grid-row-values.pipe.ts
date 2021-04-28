import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getGridRowValues'
})
export class GridRowValuesPipe implements PipeTransform {
  transform(gridRowData: any): { key: string, value: any }[] {
    const rowValues = [];
    Object.keys(gridRowData).forEach(key => {
      rowValues.push({key, value: gridRowData[key]});
    });
    return rowValues;
  }
}
