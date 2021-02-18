import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Lugar } from 'src/app/model/lugar';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { LugarService } from 'src/app/services/lugar.service';
import { CreateComentarioPage } from '../create-comentario/create-comentario.page';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  @Input('lugar') lugar:Lugar;
  
  public listaComentarios :any[] = Array[20];
 

  constructor(private lugarS:LugarService,
    public alertController: AlertController,
    private modalController:ModalController) { }

  ngOnInit() {
    this.cargaDatos();
    console.log(this.lugar.id);
    
  
  }

  
  initializeItems(){
    this.listaComentarios;
    console.log(this.listaComentarios);
  }


  
  public cargaDatos($event=null){

    console.log(this.listaComentarios);
    
    try {
      this.lugarS.leerComentarios(this.lugar.id)
        .subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaComentarios=[];
          info.forEach((doc)=>{
            let comentario={
              id:doc.id,
              ...doc.data()
            }
            this.listaComentarios.push(comentario);
          });
          //Ocultar el loading
          this.listaComentarios;             
          
          if($event){
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }

  // public borraLugar(id:any){
  //   this.lugaresS.borraNota(id)
  //   .then(()=>{
  //     //ya está borrada allí
  //     let tmp=[];
  //     this.listaLugares.forEach((nota)=>{     
  //       if(nota.id!=id){
  //        tmp.push(nota);
  //       }
  //     })
  //     this.listaLugaresBuscar=tmp;
  //    ;
  //   })
  //   .catch(err=>{

  //   })
  // }

 
  // async alertBorraLugar(id:any) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Borrar Nota',
  //     message: '¿Quiere borrar el lugar?',
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (alert) => {}
  //       }, {
  //         text: 'Confirmar',
  //         handler: (alert) => {
  //           this.borraLugar(id);
  //           //  this.Nativeringtones.playRingtone('../../assets/ringtones/basura.mp3');
  //           // this.vibration.vibrate(1000);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  public async createComentario(lugar:Lugar){
    const modal = await this.modalController.create({
      component: CreateComentarioPage,
      cssClass: 'my-custom-class',
      componentProps:{
        lugar:lugar
      }
    });
    return await modal.present();
  }
}