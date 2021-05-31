import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestEditPlacePage } from './request-edit-place.page';

const routes: Routes = [
  {
    path: '',
    component: RequestEditPlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestEditPlacePageRoutingModule {}
