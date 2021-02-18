import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateComentarioPageRoutingModule } from './create-comentario-routing.module';

import { CreateComentarioPage } from './create-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateComentarioPageRoutingModule
  ],
  declarations: [CreateComentarioPage]
})
export class CreateComentarioPageModule {}
