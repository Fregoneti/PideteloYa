import { Component, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { LoginPage } from './pages/login/login.page';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { cuenta } from './model/cuenta';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Login',
      url: '/folder/login',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  langmenu: any;
  user:cuenta;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS: AuthService,
    private modalController: ModalController,
    public translate:TranslateService,
    
  ) {
    this.initializeApp();
    this.user=this.authS.user;
    console.log("soy el usuario con correo-> "+this.user.email);
       
    this.langmenu = (environment.defaultLanguage == "es" ? false : true);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authS.init();
      console.log("soy el usuario con correo-> "+this.user.email);

      this.translate.addLangs(environment.currentLanguages);  //add all languages
      this.translate.setDefaultLang(environment.defaultLanguage); //use default language
      if (this.translate.getBrowserLang) {  //if browsers's language is avalaible is set up as default
        if (environment.currentLanguages.includes(this.translate.getBrowserLang())) {
          this.translate.use(this.translate.getBrowserLang());
        }
      }




      this.checkDarkTheme();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    
  }

  public async login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class',
      componentProps: {}

    });
    return await modal.present();
  }

  logOut() {
    //this.presentLoading();
    this.authS.logout().then(d => {
      //this.loadingController.dismiss();
      console.log("Sesion cerrada");

    }).catch(err => {
      //this.loadingController.dismiss();
      console.log("Error logging out")
    });
  }

  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(prefersDark.matches){
      document.body.classList.toggle('dark');
    }   
  }

  isAuth() {
    return this.authS.isAuthenticated();
  }

  isAdminAuth() {
    return this.authS.isAdminAuth();
  }

}
