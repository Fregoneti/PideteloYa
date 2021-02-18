import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { comentarios } from 'src/app/model/comentarios';
import { Lugar } from 'src/app/model/lugar';
import { AuthService } from 'src/app/services/auth.service';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-create-comentario',
  templateUrl: './create-comentario.page.html',
  styleUrls: ['./create-comentario.page.scss'],
})
export class CreateComentarioPage implements OnInit {

  @Input('lugar') lugar: Lugar;
  public comentarios: FormGroup;
  private user:any;
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalController:ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public lugars: LugarService,
    private authS:AuthService) {

    this.comentarios = this.formBuilder.group({
      // name:['',Validators.required],
      description: [''],

    })
    this.user=this.authS.user;
  }

  ngOnInit() {
    console.log(this.lugar.id)
  }



  public async sendForm() {
    await this.presentLoading();

    let data: comentarios = {
      description: this.comentarios.get('description').value,
      email:this.user.email

    }
    console.log(data.description);


    this.lugars.agregaComentario(this.lugar.id, data)
      .then((respuesta) => {
        this.comentarios.setValue({
          description: '',
        //  email:''


        })
        this.loadingController.dismiss();
        this.closeModal();
        this.presentToast("Comentario creado", "success");
      })
      .catch((err) => {
        this.loadingController.dismiss();
        this.presentToast("Error creando el comentario", "danger");
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
  
  closeModal() { this.modalController.dismiss(); }

}
