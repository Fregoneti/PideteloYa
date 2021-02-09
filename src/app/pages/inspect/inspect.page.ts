import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ModalController } from '@ionic/angular';
import { LocationPage } from 'src/app/pages/location/location.page';
import { Lugar } from 'src/app/model/lugar';
import { ComentariosPage } from '../comentarios/comentarios.page';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.page.html',
  styleUrls: ['./inspect.page.scss'],
})
export class InspectPage implements OnInit {

  @Input('lugar') lugar:Lugar;
  
  constructor(private callNumber: CallNumber,
    private modalController:ModalController) { }

  ngOnInit() {
  }

  call(){
    this.callNumber.callNumber(this.lugar.n_phone, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }


  public async map(lugar:Lugar){
    const modal = await this.modalController.create({
      component: LocationPage,
      cssClass: 'my-custom-class',
      componentProps:{
        lugar:lugar
      }
    });

    modal.onDidDismiss()
      .then((data) => {
      //  this.location = data['data']; //Variable del modal
       
        // console.log(this.location);
        // console.log(this.latitud);
        // console.log(this.longitud);
        
       
    });

    return await modal.present();
  }

  public async comentarios(lugar:Lugar){
    const modal = await this.modalController.create({
      component: ComentariosPage,
      cssClass: 'my-custom-class',
      componentProps:{
        lugar:lugar
      }
    });

    modal.onDidDismiss()
      .then((data) => {
      //  this.location = data['data']; //Variable del modal
       
        // console.log(this.location);
        // console.log(this.latitud);
        // console.log(this.longitud);
        
       
    });

    return await modal.present();
  }



}
