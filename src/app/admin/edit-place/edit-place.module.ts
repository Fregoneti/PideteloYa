import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPlacePageRoutingModule } from './edit-place-routing.module';

import { EditPlacePage } from './edit-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditPlacePageRoutingModule
  ],
  declarations: [EditPlacePage]
})
export class EditPlacePageModule {}
