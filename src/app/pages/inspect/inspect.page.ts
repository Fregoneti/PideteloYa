import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ModalController } from '@ionic/angular';
import { LocationPage } from 'src/app/pages/location/location.page';
import { Lugar } from 'src/app/model/lugar';
import { ComentariosPage } from '../comentarios/comentarios.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.page.html',
  styleUrls: ['./inspect.page.scss'],
})
export class InspectPage implements OnInit {

  @Input('lugar') lugar:Lugar;
  user:any;
  
  constructor(private callNumber: CallNumber,
    private modalController:ModalController,
    private authS:AuthService
    ) { }

  ngOnInit() {
    this.user=this.authS.user;
    console.log("Nombre"+ this.user.email);
    
     
    
    
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
  
  closeModal() { this.modalController.dismiss(); }



}
