import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPlacePage } from './edit-place.page';

const routes: Routes = [
  {
    path: '',
    component: EditPlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPlacePageRoutingModule {}
