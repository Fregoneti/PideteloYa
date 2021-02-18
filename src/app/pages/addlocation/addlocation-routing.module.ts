import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddlocationPage } from './addlocation.page';

const routes: Routes = [
  {
    path: '',
    component: AddlocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddlocationPageRoutingModule {}
