import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SortingOrder } from '@app/models';
import { FormService } from '@app/states/form.service';
import { GridService } from '@app/states/grid.service';
import { FormFieldType } from '@models/form-field-type.enum';
import { FormField } from '@models/form-field.interface';
import { QueryParams } from '@models/query-params.interface';

@Component({
  selector: 'sl-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss']
})
export class CustomGridComponent implements OnInit, OnChanges {
  @Input() gridData: any[] = [];
  @Input() isMenuColumn = false;
  @Input() dataSize = 0;
  @Input() addNewItemPath = '';
  @Input() editableColumns: Record<string, FormField>;
  @Output() queryParamsChange: EventEmitter<QueryParams> = new EventEmitter<QueryParams>();
  @Output() removeRecord: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Output() updateRecord: EventEmitter<any> = new EventEmitter<any>();
  @Input() sortedColumn; // pass a header name if should be sorted by default
  queryParams: QueryParams = {searchValue: null, pageIndex: null, sortParams: null};
  numberOfPages;
  editingRecordID;
  formGroup: FormGroup = new FormGroup({});
  sortingOrder: SortingOrder;
  readonly FormFieldType = FormFieldType;
  readonly SortingOrder = SortingOrder;

  constructor(private formService: FormService, private gridService: GridService) {
  }

  ngOnInit() {
    if (this.sortedColumn) {
      this.onSortData(this.sortedColumn);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSize) {
      this.numberOfPages = Math.ceil(this.dataSize / 10);
    }

    if (changes.editableColumns && this.editableColumns && Object.keys(this.formGroup.controls).length === 0) {
      this.generateFormControls();
    }
  }

  // FILTERING

  onSearchValueChange(searchValue: string) {
    this.queryParams.searchValue = searchValue;
    this.queryParams.pageIndex = 1;
    this.queryParamsChange.emit(this.queryParams);
    this.gridService.reducePageIndex(true);
    this.editingRecordID = null;
  }

  // PAGINATION

  onPageIndexChange(pageIndex: number) {
    this.queryParams.pageIndex = pageIndex;
    this.queryParamsChange.emit(this.queryParams);
    this.editingRecordID = null;
  }

  // INLINE EDITING

  generateFormControls() {
    const group: { [key: string]: FormControl } = {};

    Object.keys(this.editableColumns).forEach(columnKey => {
      const newFormControl = new FormControl(null, this.editableColumns[columnKey].required ? Validators.required : null);
      group[columnKey] = newFormControl;
    });

    this.formGroup = new FormGroup(group);
  }

  startEditing(record: any) {
    this.patchFormValues(record);
    this.editingRecordID = record.id;
  }

  private patchFormValues(record) {
    Object.keys(record).forEach(key => {
      if (this.formGroup.controls[key]) {
        this.formGroup.controls[key].setValue(record[key]);
      }
    });
  }

  onUpdateRecord() {
    if (this.formGroup.invalid) {
      this.formService.markFormGroupTouched(this.formGroup);
      return;
    }
    this.updateRecord.emit({id: this.editingRecordID, ...this.formGroup.getRawValue()});
    this.editingRecordID = null;
  }

  discardChanges() {
    this.editingRecordID = null;
    this.formGroup.reset();
  }

  // SORTING

  onSortData(columnName: string) {
    // JSON-SERVER sorting method is case sensitive (had to use it because of server side pagination requirement)
    if (columnName !== this.sortedColumn) {
      this.sortingOrder = null;
    }
    this.sortingOrder = this.sortingOrder ?
      (this.sortingOrder === SortingOrder.ASC ? SortingOrder.DESC : SortingOrder.ASC) : SortingOrder.ASC;
    this.sortedColumn = columnName;
    this.queryParams.sortParams = {columnName: this.sortedColumn, sortingOrder: this.sortingOrder};
    this.queryParamsChange.emit(this.queryParams);
  }
}
