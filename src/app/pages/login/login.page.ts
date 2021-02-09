import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  userdata: any;
  mensaje: boolean;
  constructor(private google:GooglePlus,
    private authS:AuthService,private router:Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.authS.isLogged()==true){
      console.log(this.authS.isLogged);
      
      this.router.navigate(['/'])
    }

    {
      this.loginForm = this.formBuilder.group({
        'email': ['',
          [Validators.required,
          Validators.email
          ]
        ],
        'pass': ['', [
          Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6)
        ]
        ]
      });
  
    }  
  }

    
  public async login(){
    let u=await this.authS.login();
    if(u.token!=-1){
    //  this.router.navigate(['/login'])
    }
  }


  //NORMAL LOGIN



  onSubmit() {
    this.userdata = this.saveUserdata();
    this.authS.inicioSesion(this.userdata);
    setTimeout(() => {
      if (this.isAuth() === false) {
        // Login incorrecto
        this.mensaje = true
      }
    }, 2000);
  }

  isAuth() {
    return this.authS.isAuthenticated();
}



  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('pass').value,


    };
    

    return saveUserdata;
  }


  

}
