import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './services/auth.service';
import { LugarService } from './services/lugar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

firebase.initializeApp(environment.firebaseConfig);

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    IonicModule.forRoot(),
    AngularFireAuthModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CallNumber,
    NativeGeocoder,
    LugarService,
    NativeStorage,
    GooglePlus,
    SplashScreen,
    AuthService, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
