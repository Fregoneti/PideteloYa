
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { cuenta } from '../model/cuenta';
import { Lugar } from '../model/lugar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage  {
  @Input('lugar') lugar: Lugar;
  @Input('cuenta') cuenta: cuenta;
  @ViewChild("content") content: any;

  user:any;
  emailFormated:String;
  email: any;
  message: string = "";
  messages = [];

  constructor(public navCtrl: NavController,
    public auth:AuthService,
    ) {
    this.cuenta=this.auth.user;
    
    this.user=this.auth.user;
    this.email=this.auth.user.email
    this.email=this.email.replaceAll(".", "");
    this.getMessages();
  }

  getMessages(){
    console.log(this.email+"entro del messages");
    
    
    var messagesRef = firebase.database().ref().child("mensajes/"+this.email);
    messagesRef.on("value", (snap) => {
      var data = snap.val();
      this.messages = [];
      for(var key in data){
        this.messages.push(data[key]);
      }
     this.scrollToBottom
    });
  }

  scrollToBottom(){
    var contentEnd = document.getElementById("content-end").offsetTop;
    this.content.scrollTo(0, contentEnd, 300);
  }

  sendMessage(){
    var messagesRef = firebase.database().ref().child("mensajes/"+this.email);
    messagesRef.push({mensaje: this.message, nombre: this.email });
    this.message = "";



    
  }

}