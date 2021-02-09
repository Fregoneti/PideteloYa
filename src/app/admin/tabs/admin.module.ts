import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
