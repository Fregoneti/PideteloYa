import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Solicitud } from 'src/app/model/solicitud';
import { RequestCreateService } from 'src/app/services/request-create.service';
import { EditPlacePage } from '../edit-place/edit-place.page';
import { RequestEditPlacePage } from '../request-edit-place/request-edit-place.page';

@Component({
  selector: 'app-tabadmin4',
  templateUrl: './tabadmin4.page.html',
  styleUrls: ['./tabadmin4.page.scss'],
})
export class Tabadmin4Page implements OnInit {

  public listaLugaresRequest :any[];
  public listaLugaresBuscar=[];

  constructor(private lugaresS:RequestCreateService,
    public alertController: AlertController,
    private modalController:ModalController) { }

  ngOnInit() {
    this.cargaDatos();
  
  }

  
  initializeItems(){
    this.listaLugaresBuscar = this.listaLugaresRequest;
    console.log(this.listaLugaresRequest);
  }


  
  public cargaDatos($event=null){

    console.log(this.listaLugaresRequest);
    
    try {
      this.lugaresS.leeSolicitudes()
        .subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaLugaresRequest=[];
          info.forEach((doc)=>{
            let lugar={
              id:doc.id,
              ...doc.data()
            }
            this.listaLugaresRequest.push(lugar);
          });
          //Ocultar el loading
          this.listaLugaresBuscar=this.listaLugaresRequest;             
          
          if($event){
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }

  public borraLugar(id:any){
    this.lugaresS.borraSolicitud(id)
    .then(()=>{
      //ya está borrada allí
      let tmp=[];
      this.listaLugaresRequest.forEach((nota)=>{     
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

  public async editaLugar(solicitud:Solicitud){
    const modal = await this.modalController.create({
      component: RequestEditPlacePage,
      cssClass: 'my-custom-class',
      componentProps:{
        lugar:solicitud
      }
    });
    return await modal.present();
  }

}
