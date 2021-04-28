import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BasicComponent } from '@app/basic-component';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sl-grid-top-bar',
  templateUrl: './grid-top-bar.component.html',
  styleUrls: ['./grid-top-bar.component.scss']
})
export class GridTopBarComponent extends BasicComponent {
  @Input() addNewItemRoutePath = '';
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  valueToSearch = new FormControl();

  constructor() {
    super();

    this.valueToSearch.valueChanges
      .pipe(
        debounceTime(200),
        takeUntil(this.componentDestroyed$))
      .subscribe(value => {
        this.searchValue.emit(value);
      });
  }
}
