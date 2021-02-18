import { Component, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { LoginPage } from './pages/login/login.page';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { cuenta } from './model/cuenta';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
  user:any;
  public adressFire:Observable<string>;
  uploadProgress: any;
  fileRef: any;
  tempImg: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authS: AuthService,
    private camera: Camera,
    private storage:AngularFireStorage, 
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
      this.authS.logout();
      this.authS.init();
      console.log("Soy el usuario con correo-> "+this.user.email);

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
      this.authS.isAdmin=false;

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


  saveImageFirebaseStorage(filepaht:string,name_image:string,imagen:string){
    const ruta_image=filepaht+name_image+'.png';
    this.fileRef= this.storage.ref(ruta_image);
    var block = imagen.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    const place=this.storage.upload(ruta_image,this.b64toBlob(realData,contentType,512));
    this.uploadProgress = place.percentageChanges();
    place.snapshotChanges().pipe(finalize(async() =>{ this.adressFire = this.fileRef.getDownloadURL();
    // let adressI=await this.adressFire.toPromise();
    // console.log(adressI);
    
   })).subscribe();
      
  }
  
   private b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  
  camara() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then( ( imageData ) => {
      let base64Image = 'data:image/png;base64,' + imageData;
      this.tempImg = base64Image;

     
      console.log("Guardada bien");
      

     }, (err) => {
      // Handle error
     });
    }

    openGallery() {
       
      this.camera.getPicture(this.optionsGallery).then((imageData) => {
        let base64Image = 'data:image/png;base64,' + imageData;
        this.tempImg = base64Image;
        const id=Math.random().toString(36).substring(2);
        this.saveImageFirebaseStorage("placesImage/",id,this.tempImg);



       }, (err) => {
        // Handle error
        console.log(err)
       })
}

private optionsGallery: CameraOptions = {
  quality: 100,
  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.PNG,
  mediaType: this.camera.MediaType.PICTURE
}
}
