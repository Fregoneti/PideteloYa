import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Lugar } from 'src/app/model/lugar';
import { AuthService } from 'src/app/services/auth.service';
import { LugarService } from 'src/app/services/lugar.service';
import { CreateComentarioPage } from '../create-comentario/create-comentario.page';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  @Input('lugar') lugar: Lugar;

  public listaComentarios: any[] = Array[20];


  constructor(private lugarS: LugarService,
    public alertController: AlertController,
    public authS: AuthService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.cargaDatos();
    console.log(this.lugar.id);


  }


  initializeItems() {
    this.listaComentarios;
    console.log(this.listaComentarios);
  }



  public cargaDatos($event = null) {

    console.log(this.listaComentarios);

    try {
      this.lugarS.leerComentarios(this.lugar.id)
        .subscribe((info: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaComentarios = [];
          info.forEach((doc) => {
            let comentario = {
              id: doc.id,
              ...doc.data()
            }
            this.listaComentarios.push(comentario);
          });
          //Ocultar el loading
          this.listaComentarios;

          if ($event) {
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }

 
  public async createComentario(lugar: Lugar) {
    const modal = await this.modalController.create({
      component: CreateComentarioPage,
      cssClass: 'my-custom-class',
      componentProps: {
        lugar: lugar
      }
    });
    return await modal.present();
  }

  
  isAuth() {
    return this.authS.isAuthenticated();
  }
  closeModal() { this.modalController.dismiss(); }
}