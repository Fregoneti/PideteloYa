import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRequestPlacePage } from './create-request-place.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRequestPlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRequestPlacePageRoutingModule {}
