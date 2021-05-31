import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tabadmin4Page } from './tabadmin4.page';

const routes: Routes = [
  {
    path: '',
    component: Tabadmin4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tabadmin4PageRoutingModule {}
