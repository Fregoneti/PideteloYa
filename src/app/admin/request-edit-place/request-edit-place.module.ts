import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestEditPlacePageRoutingModule } from './request-edit-place-routing.module';

import { RequestEditPlacePage } from './request-edit-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RequestEditPlacePageRoutingModule
  ],
  declarations: [RequestEditPlacePage]
})
export class RequestEditPlacePageModule {}
