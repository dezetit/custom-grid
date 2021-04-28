import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GridPaginationComponent } from '@shared/custom-grid/grid-pagination/grid-pagination.component';
import { GridTopBarComponent } from '@shared/custom-grid/grid-top-bar/grid-top-bar.component';
import { ControlValuePipe, GridHeadersPipe, GridRowValuesPipe, IsInvalidControlPipe } from '@shared/pipes';
import { ValidationMessagesComponent } from '@shared/validation-messages/validation-messages.component';

import { CustomGridComponent } from './custom-grid.component';

describe('CustomGridComponent', () => {
  let component: CustomGridComponent;
  let fixture: ComponentFixture<CustomGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomGridComponent,
        GridTopBarComponent,
        GridPaginationComponent,
        GridHeadersPipe,
        GridRowValuesPipe,
        IsInvalidControlPipe,
        ControlValuePipe,
        ValidationMessagesComponent],
      imports: [
        BrowserTestingModule,
        ReactiveFormsModule,
        RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
