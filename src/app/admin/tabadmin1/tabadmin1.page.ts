import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Lugar } from 'src/app/model/lugar';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-tabadmin1',
  templateUrl: './tabadmin1.page.html',
  styleUrls: ['./tabadmin1.page.scss'],
})
export class Tabadmin1Page implements OnInit {

  public places:FormGroup;
  tempImg: string;



  constructor(
    private formBuilder:FormBuilder,
    private lugarS:LugarService,
    private router:Router,
    private camera: Camera,
    private modalController:ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController) {
      
    this.places=this.formBuilder.group({
      name:['',Validators.required],
      n_phone:[''],
      adress:['']
    })
     }

  ngOnInit() {
  }


  public async sendForm(){
    await this.presentLoading();
    
    let data:Lugar={
      name:this.places.get('name').value,
      n_phone:this.places.get('n_phone').value,
      adress:this.places.get('adress').value,
      
    }
    this.lugarS.agregaLugar(data)
    .then((respuesta)=>{
      this.places.setValue({
        name:'',
        n_phone:'',
        adress:'',
                
      })
      this.loadingController.dismiss();
      this.router.navigate(['/']);
      this.presentToast("Nota guardada","success");
    })
    .catch((err)=>{
      this.loadingController.dismiss();
      this.presentToast("Error guardando nota","danger");
      console.log(err);
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner:'crescent'
    });
    await loading.present();
  }
  async presentToast(msg:string,col:string) {
    const toast = await this.toastController.create({
      message: msg,
      color:col,
      duration: 2000,
      position:"top"
    });
    toast.present();
  }

  camara() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then( ( imageData ) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.tempImg = base64Image;
     }, (err) => {
      // Handle error
     });
    }

    openGallery() {
       
      this.camera.getPicture(this.optionsGallery).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        // Handle error
        console.log(err)
       })
}

private optionsGallery: CameraOptions = {
  quality: 100,
  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}
}
