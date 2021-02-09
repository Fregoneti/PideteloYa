import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Lugar } from 'src/app/model/lugar';
import { LugarService } from 'src/app/services/lugar.service';
import { EditPlacePage } from '../edit-place/edit-place.page';

@Component({
  selector: 'app-tabadmin2',
  templateUrl: './tabadmin2.page.html',
  styleUrls: ['./tabadmin2.page.scss'],
})
export class Tabadmin2Page implements OnInit {


 
  public listaLugares :any[] = Array[20];
  public listaLugaresBuscar=[];

  constructor(private lugaresS:LugarService,
    public alertController: AlertController,
    private modalController:ModalController) { }

  ngOnInit() {
    this.cargaDatos();
  
  }

  
  initializeItems(){
    this.listaLugaresBuscar = this.listaLugares;
    console.log(this.listaLugares);
  }


  
  public cargaDatos($event=null){

    console.log(this.listaLugares);
    
    try {
      this.lugaresS.leeLugares()
        .subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaLugares=[];
          info.forEach((doc)=>{
            let nota={
              id:doc.id,
              ...doc.data()
            }
            this.listaLugares.push(nota);
          });
          //Ocultar el loading
          this.listaLugaresBuscar=this.listaLugares;             
          
          if($event){
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }

  public borraLugar(id:any){
    this.lugaresS.borraNota(id)
    .then(()=>{
      //ya está borrada allí
      let tmp=[];
      this.listaLugares.forEach((nota)=>{     
        if(nota.id!=id){
         tmp.push(nota);
        }
      })
      this.listaLugaresBuscar=tmp;
     ;
    })
    .catch(err=>{

    })
  }

  getNotaSearchBar(ev:any){
    this.initializeItems();
    let val = ev.target.value;
  
    console.log(val);
    console.log(this.listaLugaresBuscar);
    
    

    if(val && val.trim() != ""){
      this.listaLugaresBuscar = this.listaLugaresBuscar.filter((item)=>{

        return (item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
      console.log(this.listaLugaresBuscar);
      
    }
  }
  async alertBorraLugar(id:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Borrar Nota',
      message: '¿Quiere borrar el lugar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (alert) => {}
        }, {
          text: 'Confirmar',
          handler: (alert) => {
            this.borraLugar(id);
            //  this.Nativeringtones.playRingtone('../../assets/ringtones/basura.mp3');
            // this.vibration.vibrate(1000);
          }
        }
      ]
    });

    await alert.present();
  }

  public async editaLugar(lugar:Lugar){
    const modal = await this.modalController.create({
      component: EditPlacePage,
      cssClass: 'my-custom-class',
      componentProps:{
        lugar:lugar
      }
    });
    return await modal.present();
  }
}
