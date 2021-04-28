import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getGridHeaders'
})
export class GridHeadersPipe implements PipeTransform {
  transform(gridData: any[]): string[] {
    return gridData.length ? Object.keys(gridData[0]) : [];
  }
}
