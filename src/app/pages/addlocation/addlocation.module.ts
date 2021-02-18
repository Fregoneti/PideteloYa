import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddlocationPageRoutingModule } from './addlocation-routing.module';

import { AddlocationPage } from './addlocation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlocationPageRoutingModule
  ],
  declarations: [AddlocationPage]
})
export class AddlocationPageModule {}
