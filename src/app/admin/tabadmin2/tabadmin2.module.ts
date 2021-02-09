import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { Tabadmin2PageRoutingModule } from './tabadmin2-routing.module';

import { Tabadmin2Page } from './tabadmin2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    Tabadmin2PageRoutingModule
  ],
  declarations: [Tabadmin2Page]
})
export class Tabadmin2PageModule {}
