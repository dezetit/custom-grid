import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CustomGridComponent } from '@shared/custom-grid/custom-grid.component';
import { GridPaginationComponent } from '@shared/custom-grid/grid-pagination/grid-pagination.component';
import { GridTopBarComponent } from '@shared/custom-grid/grid-top-bar/grid-top-bar.component';
import { ControlValuePipe, GridHeadersPipe, GridRowValuesPipe, IsInvalidControlPipe } from '@shared/pipes';
import { ValidationMessagesComponent } from '@shared/validation-messages/validation-messages.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    CustomGridComponent,
    GridPaginationComponent,
    GridTopBarComponent,
    GridHeadersPipe,
    GridRowValuesPipe,
    DynamicFormComponent,
    LoaderComponent,
    ValidationMessagesComponent,
    ControlValuePipe,
    IsInvalidControlPipe
  ],
  exports: [
    CustomGridComponent,
    DynamicFormComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule {
}
