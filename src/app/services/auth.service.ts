import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { cuenta } from '../model/cuenta';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AdminPage } from '../admin/tabs/admin.page';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public isAdmin:boolean;


  public user: cuenta = {
    token: -1,
    name: '',
    avatar: '',
    email: ''
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
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  isAdminAuth() {
    
   if(this.isAdmin==true){
     console.log("ES admin auth");
     
      return true;
   }else{
    console.log("No es admin auth");
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
        
        if(userdata.email=="admin@admin.es"&&userdata.password=="admin123"){
          console.log("SOY ADMIN JEJEJEEJJEJEJE");
          
          this.isAdmin=true;
        }

        this.router.navigate(['/home']);
      }).catch(
        error => { console.log(error); }
      )
  }

  
}
