import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Lugar } from 'src/app/model/lugar';
import { Solicitud } from 'src/app/model/solicitud';
import { LugarService } from 'src/app/services/lugar.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { RequestCreateService } from 'src/app/services/request-create.service';


@Component({
  selector: 'app-request-edit-place',
  templateUrl: './request-edit-place.page.html',
  styleUrls: ['./request-edit-place.page.scss'],
})
export class RequestEditPlacePage implements OnInit {

  @Input('lugar') lugar:Solicitud;
  public adressFire:Observable<string>;
  public lugares:FormGroup;
  public map:L.Map
  image:any;
  tempImg: string;
  fileRef: any;
  uploadProgress: any;
  photoCharged:boolean=false;

  constructor(
    private formBuilder:FormBuilder,
    private lugarS:LugarService,
    private requestS:RequestCreateService,
    private router:Router,
    private storage:AngularFireStorage, 
    private camera: Camera,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private modalController:ModalController) {
      this.lugares=this.formBuilder.group({
        name:['',Validators.required],
        n_phone:[''],
        adress:['']
     });
    }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.lugares.get('name').setValue(this.lugar.name);
    this.lugares.get('adress').setValue(this.lugar.adress);
    this.lugares.get('n_phone').setValue(this.lugar.n_phone);
  }


  public async sendForm(){
    console.log("hola");
    await this.presentLoading();
    console.log("Antes de declarar data:lugar");
  
    
    let data:Lugar={
      name:this.lugares.get('name').value,
      n_phone:this.lugares.get('n_phone').value,
      adress:this.lugares.get('adress').value,
      longitude:this.lugar.longitude,
      latitude:this.lugar.latitude,
      photo:this.lugar.photo
    }
    console.log("Antes de agregar");
    this.lugarS.agregaLugar(data)
    .then((respuesta)=>{
      this.lugares.setValue({
        name:'',
        n_phone:'',
        adress:'',
        
                
      })
      this.loadingController.dismiss();
    
      this.presentToast("Lugar guardado","success");
      this.borraLugar(this.lugar.id);
      this.modalController.dismiss
    })
    .catch((err)=>{
      this.loadingController.dismiss();
      this.presentToast("Error guardando lugar","danger");
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
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
     // correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
      this.camera.getPicture(options).then( ( imageData ) => {
      let base64Image = 'data:image/png;base64,' + imageData;
      this.tempImg = base64Image;
      const id=Math.random().toString(36).substring(2);
      this.saveImageFirebaseStorage("placesImage/",id,this.tempImg);
      this.photoCharged=true;
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
        this.photoCharged=true;



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

public borraLugar(id:any){
  this.requestS.borraSolicitud(id);
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


}
