import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tabadmin4PageRoutingModule } from './tabadmin4-routing.module';

import { Tabadmin4Page } from './tabadmin4.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    Tabadmin4PageRoutingModule,

  ],
  declarations: [Tabadmin4Page]
})
export class Tabadmin4PageModule {}
