import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tabadmin3Page } from './tabadmin3.page';

const routes: Routes = [
  {
    path: '',
    component: Tabadmin3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tabadmin3PageRoutingModule {}
