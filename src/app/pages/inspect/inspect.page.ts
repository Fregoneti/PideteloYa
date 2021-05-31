import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ModalController } from '@ionic/angular';
import { LocationPage } from 'src/app/pages/location/location.page';
import { Lugar } from 'src/app/model/lugar';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ComentariosPage } from '../comentarios/comentarios.page';
import { AuthService } from 'src/app/services/auth.service';
import { ChatPage } from 'src/app/chat/chat.page';
import { cuenta } from 'src/app/model/cuenta';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.page.html',
  styleUrls: ['./inspect.page.scss'],
})
export class InspectPage implements OnInit {

  @Input('lugar') lugar:Lugar;
  @Input('email') email:any;
  user:any;
  
  
  constructor(private callNumber: CallNumber,
    private modalController:ModalController,
    private socialSharing: SocialSharing,
    private authS:AuthService
    ) { 

      console.log("PORFA FUNCIONA")+this.email;
      
    }

  ngOnInit() {
    this.user=this.authS.user;
    console.log("Nombre"+ this.user.email);
    
  }
  isAuth() {
    return this.authS.isAuthenticated();
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

  public async pedir(lugar:Lugar,cuenta:cuenta){
    const modal = await this.modalController.create({
      component: ChatPage,
      cssClass: 'my-custom-class',
      componentProps:{
         lugar:lugar,
         cuenta:cuenta
      }
    });

    modal.onDidDismiss()
      .then((data) => {
    
        
       
    });

    return await modal.present();
  }
  
  
  closeModal() { this.modalController.dismiss(); }

  shareviaWhatsapp(){
    this.socialSharing.shareViaWhatsApp("Te comparto este lugar llamado "+this.lugar.name+" para que puedas pedir. TLF: "+this.lugar.n_phone)
      .then((success) =>{
          alert("Success");
       })
        .catch(()=>{
          alert("Could not share information");
        });
    }



}
