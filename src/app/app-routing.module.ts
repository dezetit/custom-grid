import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewItemFormComponent } from '@app/list-view/new-item-form/new-item-form.component';
import { ListViewComponent } from '@app/list-view/list-view.component';

const routes: Routes = [
  {
    path: '',
    component: ListViewComponent
  },
  {
    path: 'add-new-character',
    component: NewItemFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
