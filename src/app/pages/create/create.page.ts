import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Lugar } from 'src/app/model/lugar';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
    private places:FormGroup,
    private formBuilder:FormBuilder,
    private lugarS:LugarService,
    private router:Router,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
  
    this.places=this.formBuilder.group({
      name:['',Validators.required],
      photo:[''],
      n_phone:[''],
      
    })
  }

  ngOnInit() {
  }

   
  
    
  
    public async sendForm(){
      await this.presentLoading();
      
      let data:Lugar={
        name:this.places.get('name').value,
        n_phone:this.places.get('n_phone').value,
      
        
  
      }
      this.lugarS.agregaLugar(data)
      .then((respuesta)=>{
        this.places.setValue({
          name:'',
          n_phone:'',
       
          
        })
        this.loadingController.dismiss();
        this.router.navigate(['/']);
        this.presentToast("Lugar guardado","success");
      })
      .catch((err)=>{
        this.loadingController.dismiss();
        this.presentToast("Error guardando lugar","danger");
        console.log(err);
      })
    }
  
    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: '',
        spinner:'crescent'
      });
      await loading.present();
    }
    async presentToast(msg:string,col:string) {
      const toast = await this.toastController.create({
        message: msg,
        color:col,
        duration: 2000,
        position:"top"
      });
      toast.present();
    }
  
  
   
  
  
  
  


  
}
