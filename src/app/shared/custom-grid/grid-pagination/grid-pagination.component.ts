import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicComponent } from '@app/basic-component';
import { GridService } from '@app/states/grid.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sl-grid-pagination',
  templateUrl: './grid-pagination.component.html',
  styleUrls: ['./grid-pagination.component.scss']
})
export class GridPaginationComponent extends BasicComponent implements OnInit {
  @Output() pageIndexSelection: EventEmitter<number> = new EventEmitter<number>();
  @Input() numberOfPages = 1;
  selectedPageIndex = 1;
  currentPageIndex = 1;

  constructor(private dataService: GridService) {
    super();

    this.dataService.changedPageIndex$
      .pipe(
        takeUntil(this.componentDestroyed$))
      .subscribe((reset: boolean) => {
        this.selectedPageIndex = reset ? 1 : this.selectedPageIndex - 1;
        this.currentPageIndex = reset ? 1 : (this.currentPageIndex > 1 ? this.currentPageIndex - 1 : this.currentPageIndex);
      });
  }

  ngOnInit() {
    this.pageIndexSelection.emit(1);
  }

  selectPageIndex(index: number) {
    if (this.selectedPageIndex === index) {
      return;
    }
    this.selectedPageIndex = index;
    this.pageIndexSelection.emit(index);
  }

  increasePageIndex() {
    this.currentPageIndex++;
  }

  decreasePageIndex() {
    this.currentPageIndex--;
  }
}
