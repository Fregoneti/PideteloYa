import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { comentarios } from 'src/app/model/comentarios';
import { Lugar } from 'src/app/model/lugar';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-create-comentario',
  templateUrl: './create-comentario.page.html',
  styleUrls: ['./create-comentario.page.scss'],
})
export class CreateComentarioPage implements OnInit {

  @Input('lugar') lugar:Lugar;
  public comentarios:FormGroup;

 
  constructor(
    private formBuilder:FormBuilder,
    private comentarioS:ComentariosService,
    private router:Router,
    private modalController:ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public lugars:LugarService) {
      
    this.comentarios=this.formBuilder.group({
      name:['',Validators.required],
      description:[''],
    
    })
     }

  ngOnInit() {
    console.log(this.lugar.id)    
  }



  public async sendForm(){
    await this.presentLoading();
    
    let data:comentarios={
      description:this.comentarios.get('description').value,   
      
    }
    console.log(data.description);
    

    this.lugars.agregaComentario(this.lugar.id,data)
    .then((respuesta)=>{
      this.comentarios.setValue({
        description:''

                
      })
      this.loadingController.dismiss();
      this.router.navigate(['/']);
      this.presentToast("Lugar guardado","success");
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


}
