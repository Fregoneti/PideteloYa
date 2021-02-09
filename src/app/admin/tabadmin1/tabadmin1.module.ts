import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Tabadmin1PageRoutingModule } from './tabadmin1-routing.module';

import { Tabadmin1Page } from './tabadmin1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    Tabadmin1PageRoutingModule
  ],
  declarations: [Tabadmin1Page]
})
export class Tabadmin1PageModule {}
