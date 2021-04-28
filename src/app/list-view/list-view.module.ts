import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { ListViewComponent } from './list-view.component';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';

@NgModule({
  declarations: [
    ListViewComponent,
    NewItemFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ListViewModule {
}
