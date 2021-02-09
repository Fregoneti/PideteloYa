import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Lugar } from 'src/app/model/lugar';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.page.html',
  styleUrls: ['./edit-place.page.scss'],
})
export class EditPlacePage implements OnInit {

  @Input('lugar') lugar:Lugar;
  
  public lugares:FormGroup;
  public map:L.Map

  constructor(
    private formBuilder:FormBuilder,
    private lugarS:LugarService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private modalController:ModalController,) {
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
    await this.presentLoading();
    let data:Lugar={

      name:this.lugares.get('name').value,
      n_phone:this.lugares.get('n_phone').value,
      adress:this.lugares.get('adress').value
    }

    this.lugarS.actualizaLugar(this.lugar.id,data)
    .then((respuesta)=>{
     
      this.loadingController.dismiss();
      this.presentToast("Nota guardada","success");
      
    
      this.modalController.dismiss();
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
}
