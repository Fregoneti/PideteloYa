import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeGeocoder,NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ModalController } from '@ionic/angular';
import { Map, tileLayer, marker } from "leaflet";


@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.page.html',
  styleUrls: ['./addlocation.page.scss'],
})
export class AddlocationPage implements OnInit {

 
//   iconRetinaUrl = 'assets/marker-icon-2x.png';
//   iconUrl = 'assets/marker-icon.png';
//   shadowUrl = 'assets/marker-shadow.png';
//   iconDefault = icon({
//  iconRetinaUrl:this.iconRetinaUrl,
//  iconUrl:this.iconUrl,
//  shadowUrl:this.shadowUrl,
//  iconSize: [25, 41],
//  iconAnchor: [12, 41],
//  popupAnchor: [1, -34],
//  tooltipAnchor: [16, -28],
//  shadowSize: [41, 41]
// });




  map: Map;
  coor:any[]=[];
  newMarker: any;
  address: string[];
  longitud:string;
  latitud:string;
  geo: any;
  

constructor(private geocoder: NativeGeocoder, private router: Router, 
  private modalController:ModalController,
 ) {
   
  
 // Marker.prototype.options.icon = this.iconDefault;
   //this.coor[0]="Latitud",
   //this.coor[1]="Longitud"
 }
  ngOnInit(): void {
   // Marker.prototype.options.icon = this.iconDefault;
   // console.log(this.nota);
  
    
  }
  // ngOnDestroy(): void {
  //   this.map.remove();
  // }
  
ionViewDidEnter() {
  console.log("entro");
  
    this.loadMap();
  }
loadMap() {
    this.map = new Map("mapId").setView([37.585186, -4.639252], 13);
tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Francisco de los Rios'
    }).addTo(this.map);
  }
 locatePosition() {
    //let coor = await this.geo.getCurrentPosition(37.585186,-4.639252); 
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
     // Marker.prototype.options.icon = this.iconDefault;
      this.newMarker = marker([e.latitude, e.longitude] ,  {
        
        draggable: true
      }).addTo(this.map);

      
      this.coor[0]=e.latitude;
      this.coor[1]=e.longitude;
      this.newMarker.bindPopup("¡Te encuentras aquí!").openPopup();
      this.getAddress(e.latitude, e.longitude); // This line is added
     
    
      
      this.newMarker.on("dragend", () => {
        const position = this.newMarker.getLatLng();
        
        this.getAddress(position.lat, position.lng);// This line is added
        this.coor[0]=position.lat;
        this.coor[1]=position.lng;
        console.log("latitude"+position.lat+"longitude"+ position.lng);
        
      
       
      });
    });
  }
  
  //The function below is added
  getAddress(lat: number, long: number) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geocoder.reverseGeocode(lat, long, options).then(results => {
      this.address = Object.values(results[0]).reverse();
      console.log(this.address);
      
    });
  }
// The function below is added
  confirmPickupLocation() {
    let navigationextras: NavigationExtras = {
      state: {
        pickupLocation: this.address
       
        
      }
    };
   this.modalController.dismiss(this.coor);
  // this.modalController.dismiss(this.coorprueba);
  }

  goBack(){
    this.modalController.dismiss;
  }

}
