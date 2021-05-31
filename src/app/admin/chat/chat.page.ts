import { Component, Input, OnInit, ViewChild } from '@angular/core';
//import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { CuentatokenService } from 'src/app/services/cuentatoken.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild("content") content: any;

  @Input('email') email: any;
  user: any;
  message: string = "";
  messages = [];
  token: any;
  pre: any;
  listaLugares: any[];
  //ADMIN


  constructor(public http: HttpClient,
    private tokeS: CuentatokenService) {
    console.log();

    let data = JSON.stringify({
      key: 'val',
      key2: ' otherVal'
    });


    this.getMessages(this.email);
  }

  ngOnInit() {
    console.log("mensajes/" + this.email + "Purreeba");
    this.getMessages(this.email);
  }

  getMessages(email: string) {
    console.log(email + "EMAAAAIl");


    var messagesRef = firebase.database().ref().child("mensajes/" + email);
    messagesRef.on("value", (snap) => {
      var data = snap.val();
      this.messages = [];
      for (var key in data) {
        console.log(data[key]);
        console.log(key + "keeey");
        console.log(data + "daaatraa");



        this.messages.push(data[key]);
      }

      this.scrollToBottomtom();
    });
  }


  scrollToBottomtom() {
    var contentEnd = document.getElementById("content-end").offsetTop;
    this.content.scrollTo(0, contentEnd, 800);
  }


  sendMessage() {

    var messagesRef = firebase.database().ref().child("mensajes/" + this.email);
    messagesRef.push({ mensaje: this.message, nombre: "admin" });
    this.message = "";
    console.log();

    console.log(this.email + " EMAIL");



    this.tokeS.leeToken().subscribe((info: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      //Ya ha llegado del servidor
      this.listaLugares = [];
      info.forEach((doc) => {
        let lugar = {
          id: doc.id,
          ...doc.data()
        }
        this.listaLugares.push(lugar);
      });
      //Ocultar el loading
      console.log(this.listaLugares);
      console.log(this.listaLugares.length);
  
  
      for (var i = 0; i <= this.listaLugares.length; i++) {

        console.log("recorriedno la lista de lugares " + i);
        console.log(this.email);
        console.log(this.listaLugares[i].cuenta)
    

        if (this.listaLugares[i].cuenta == this.email) {
          console.log("entro");
          
          this.pre = this.listaLugares[i].token;
          
          console.log(this.pre+"holaa");
          
        } else {
          console.log("NO SE ENCUENTRA");
  
        }
      }

    })
   
   console.log("Antes de postear");
   
   


    console.log("Despues de postear");
    
  }

  postt(token: any) {
    this.http.post('https://pideteloapi.herokuapp.com/notificaciones', {token:token}, this.header).subscribe((response) => {
      console.log(response);
    });
  }

  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'key': 'user'
    };
  }


  //   post(apiUrl: string, data: any = {}) {
  //     return this.http.post(apiUrl, JSON.stringify(data))
  //         .map((response: Response) => {
  //             return response.json();
  //         });
  // }

  //  this.http.post("http://127.0.0.1:3000/customers", postData, requestOptions)
  //       .subscribe(data => {
  //         console.log(data['_body']);
  //        }, error => {
  //         console.log(error);
  //       });
}






function data(arg0: string, data: any) {
  throw new Error('Function not implemented.');
}

