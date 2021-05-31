import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { InspectPage } from 'src/app/pages/inspect/inspect.page';
import { snapshotToArray } from 'src/environments/environment';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-tabadmin3',
  templateUrl: './tabadmin3.page.html',
  styleUrls: ['./tabadmin3.page.scss'],
})
export class Tabadmin3Page{

  public listaUsuarios :any[];

  user:any;
  email: string = "";
  emails = [];
  

  constructor( private modalController:ModalController) { 
    this.getMessages();
    
   }


  getMessages(){
    var messagesRef = firebase.database().ref("mensajes");
  
    messagesRef.on("value", (snap) => {
      var data = snap.val();
      this.emails = [];
     
      
      for(var key in data){       
       // this.emails.push(data[key]);
        this.emails.push(key);
        console.log("Key:"+key);
        console.log(data[key]);
        //console.log(data[key]+".nombre");
        
        
      }
      console.log(this.emails);
      

     // this.scrollToBottom();
    });
  }



  public async chatUsuario(email:string){
    const modal = await this.modalController.create({
      component: ChatPage,
      cssClass: 'my-custom-class',
      componentProps:{
        email
       
      }
    });
    return await modal.present();
  }

}
