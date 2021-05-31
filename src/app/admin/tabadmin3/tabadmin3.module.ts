import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tabadmin3PageRoutingModule } from './tabadmin3-routing.module';

import { Tabadmin3Page } from './tabadmin3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tabadmin3PageRoutingModule
  ],
  declarations: [Tabadmin3Page]
})
export class Tabadmin3PageModule {}
