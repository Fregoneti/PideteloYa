import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Lugar } from 'src/app/model/lugar';
import { LugarService } from 'src/app/services/lugar.service';
import { CreateRequestPlacePage } from '../create-request-place/create-request-place.page';
import { InspectPage } from '../inspect/inspect.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

 
  public listaLugares :any[] = Array[20];
  public listaLugaresBuscar=[];



  constructor(private lugarS: LugarService,
    private modalController:ModalController) { }

  ngOnInit() {
    this.cargaDatos();
  }
  initializeItems(){
    this.listaLugaresBuscar = this.listaLugares;
  
  }



  
  public cargaDatos($event=null){
    try {
     this.lugarS.leeLugares().subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaLugares=[];
          info.forEach((doc)=>{
            let lugar={
              id:doc.id,
              ...doc.data()
            }


            this.listaLugares.push(lugar);
          });
          //Ocultar el loading
          this.listaLugaresBuscar=this.listaLugares;             
          
          if($event){
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }

  

  public async inspectPlace(lugar:Lugar){
    const modal = await this.modalController.create({
      component: InspectPage,
      cssClass: 'my-custom-class',
      componentProps:{
        lugar:lugar
      }
    });
    return await modal.present();
  }


  getLugarSearchBar(ev:any){
    this.initializeItems();
    let val = ev.target.value;
  
    console.log(val);
    console.log(this.listaLugaresBuscar);
    
    

    if(val && val.trim() != ""){
      this.listaLugaresBuscar = this.listaLugaresBuscar.filter((item)=>{

        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
      console.log(this.listaLugaresBuscar);
      
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.listaLugaresBuscar.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  public async createRequestPlace(){
    const modal = await this.modalController.create({
      component: CreateRequestPlacePage,
      cssClass: 'my-custom-class',
      componentProps:{
        
      }
    });
    return await modal.present();
  }

}
