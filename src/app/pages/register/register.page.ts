import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  userdata: any;

  constructor(
    private formBuilder: FormBuilder,
    private autService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email]
      ],
      'pass': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]]
    });
    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.autService.registroUsuario(this.userdata);
    this.router.navigate(['/home'])
  }
  saveUserdata() {
    const saveUserdata = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('pass').value,
    };
    return saveUserdata;
  }

  erroresForm = {
    'email': '',
    'pass': ''

  }
  mensajesValidacion = {
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una dirección email correcta'
    },
    'pass': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener al menos una letra un número ',
      'minlength': 'y más de 6 caracteres'
    }
  }


  onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.erroresForm) {
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }

}
