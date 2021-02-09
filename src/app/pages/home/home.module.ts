import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HomePage } from './home.page';
import { HideHeaderDirective } from 'src/app/directives/hide-header.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule
  ],
  declarations: [HomePage,
 
  HideHeaderDirective,
  ]
})
export class HomePageModule {}
