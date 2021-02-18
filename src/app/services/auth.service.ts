import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { cuenta } from '../model/cuenta';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public isAdmin:boolean;
  provider = new firebase.auth.FacebookAuthProvider();


  public user: cuenta = {
    token: -1,
    name: '',
    avatar: '',
    email: '',
  }




  constructor(private storage: NativeStorage,
    private google: GooglePlus,
    
    private router: Router) { }


  async init() {
    let u = null;
    try {
      u = await this.storage.getItem("user");
    } catch (err) {
      u = null;
    }
    if (u != null) {
      this.user = u;
    }
  }

  public isLogged(): boolean {
    if (this.user.token == -1) {
      return false;
    } else {
      return true;
    }
  }

  public async logout() {
    firebase.auth().signOut();
    let u = this.google.logout();
    this.user = {
      token: -1,
      name: '',
      avatar: '',
      email: ''
    }
    await this.storage.setItem("user", this.user);
  }

  

  public async login() {
    try {
      let u = await this.google.login({})
      console.log(u)
      if (u) {
        this.user = {
          token: u['accessToken'],
          name: u['displayName'],
          avatar: u['imageUrl'],
          email: u['email']
        }
        console.log(this.user);
        this.router.navigate(["home"]);
      }
    } catch (err) {
      this.user = {
        token: -1,
        name: '',
        avatar: '',
        email: ''
      }
    }
    await this.storage.setItem("user", this.user);
    return this.user;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.isLogged()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

  //LOGIN NORMAL
  isAuthenticated() {
    const user = firebase.auth().currentUser;
    if (user || this.user.token != -1) {
      return true;
    } else {
      return false;
    }
  }

  isAdminAuth() {
    
   if(this.isAdmin==true){
    // console.log("ES admin auth");
     
      return true;
   }else{
   // console.log("No es admin auth");
     return false;
   }
  }

  



  //REGISTRO NORMAL


  registroUsuario(cuenta) {
    firebase.auth().createUserWithEmailAndPassword(cuenta.email, cuenta.password)
      .catch(error => {
        console.log(error);
      }
      )
  }


  inicioSesion(userdata) {
    this.isAdmin=false;
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
      .then(response => {

        console.log(response);
        this.user.email=userdata.email;
        console.log("El correo en inicio sesion es="+this.user.email);
        

        if(userdata.email=="admin@admin.es"&&userdata.password=="admin123"){
          console.log("SOY ADMIN JEJEJEEJJEJEJE");
          
          this.isAdmin=true;
        }

        this.router.navigate(['/home']);
      }).catch(
        error => { console.log(error); }
      )
  }

  // loginfacebook(){
  // firebase
  // .auth()
  // .signInWithPopup(this.provider)
  // .then((result) => {
  //   /** @type {firebase.auth.OAuthCredential} */
  //   var credential = result.credential;

  //   // The signed-in user info.
  //   var user = result.user;

  //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //   var accessToken = credential.accessToken;

  //   // ...
  // })
  // .catch((error) => {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;

  //   // ...
  // });
  // }
  
}
