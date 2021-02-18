import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComentarioPage } from './create-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: CreateComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateComentarioPageRoutingModule {}
