import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Lugar } from 'src/app/model/lugar';
import { AddlocationPage } from 'src/app/pages/addlocation/addlocation.page';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-tabadmin1',
  templateUrl: './tabadmin1.page.html',
  styleUrls: ['./tabadmin1.page.scss'],
})
export class Tabadmin1Page implements OnInit {

  public adressFire: Observable<string>;
  public places: FormGroup;
  tempImg: string;
  latitud: any;
  longitud: any;
  image: any;
  fileRef: any;
  uploadProgress: any;
  photoCharged: boolean = false;




  constructor(
    private formBuilder: FormBuilder,
    private lugarS: LugarService,
    private router: Router,
    private camera: Camera,
    private storage: AngularFireStorage,
    private modalController: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController) {

    this.places = this.formBuilder.group({
      name: ['', Validators.required],
      n_phone: [''],
      adress: ['']
    })
  }

  ngOnInit() {
  }


  //<ion-icon style="font-size: 40px;" (click)="this.closeModal()" name="arrow-back-outline"></ion-icon>

  public async sendForm() {
    console.log("hola");

    await this.presentLoading();

    console.log("Antes de declarar data:lugar");

    let data: Lugar = {
      name: this.places.get('name').value,
      n_phone: this.places.get('n_phone').value,
      adress: this.places.get('adress').value,
      longitude: this.longitud,
      latitude: this.latitud,
      photo: await this.adressFire.toPromise()

    }
    console.log("Antes de agregar" + data);

    this.lugarS.agregaLugar(data)
      .then((respuesta) => {
        this.places.setValue({
          name: '',
          n_phone: '',
          adress: '',


        })

        this.presentToast("Lugar guardado", "success");
      })
      .catch((err) => {
        this.loadingController.dismiss();
        this.presentToast("Error guardando lugar", "danger");
        console.log(err);
      })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner: 'crescent'
    });
    await loading.present();
  }
  async presentToast(msg: string, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position: "top"
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
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/png;base64,' + imageData;
      this.tempImg = base64Image;
      const id = Math.random().toString(36).substring(2);
      this.saveImageFirebaseStorage("placesImage/", id, this.tempImg);
      this.photoCharged = true;
      console.log("Guardada bien");


    }, (err) => {
      // Handle error
    });
  }

  openGallery() {

    this.camera.getPicture(this.optionsGallery).then((imageData) => {
      let base64Image = 'data:image/png;base64,' + imageData;
      this.tempImg = base64Image;
      const id = Math.random().toString(36).substring(2);
      this.saveImageFirebaseStorage("placesImage/", id, this.tempImg);
      this.photoCharged = true;



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

  public async addLocation() {
    const modal = await this.modalController.create({
      component: AddlocationPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // lugar:lugar
      }
    });

    modal.onDidDismiss()
      .then((data) => {

        this.latitud = data['data'][0];
        this.longitud = data['data'][1];
        console.log("Vuelvo con " + this.latitud);
        console.log("Vuelvo con " + this.longitud);


      });

    return await modal.present();
  }

  saveImageFirebaseStorage(filepaht: string, name_image: string, imagen: string) {
    const ruta_image = filepaht + name_image + '.png';
    this.fileRef = this.storage.ref(ruta_image);
    var block = imagen.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    const place = this.storage.upload(ruta_image, this.b64toBlob(realData, contentType, 512));
    this.uploadProgress = place.percentageChanges();
    place.snapshotChanges().pipe(finalize(async () => {
      this.adressFire = this.fileRef.getDownloadURL();
      // let adressI=await this.adressFire.toPromise();
      // console.log(adressI);

    })).subscribe();

  }

  private b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
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

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }



}
