import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRequestPlacePageRoutingModule } from './create-request-place-routing.module';

import { CreateRequestPlacePage } from './create-request-place.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,

    CreateRequestPlacePageRoutingModule
  ],
  declarations: [CreateRequestPlacePage]
})
export class CreateRequestPlacePageModule {}
