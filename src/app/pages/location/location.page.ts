import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Lugar } from '../../model/lugar';
import * as Leaflet from 'leaflet';
import {icon, Marker} from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";



@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})



export class LocationPage implements OnInit, OnDestroy {
  

@Input('lugar') lugar:Lugar
map: Leaflet.Map;





constructor() {

 }

ngOnInit() { }
ionViewDidEnter() { this.leafletMap(); }

leafletMap() {
  console.log([this.lugar.latitude, this.lugar.longitude]);
  this.map = Leaflet.map('mapId').setView([this.lugar.latitude, this.lugar.longitude], 200);
  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Carlos Aguilar Alférez',
  }).addTo(this.map);

  
  
  Leaflet.marker([this.lugar.latitude, this.lugar.longitude]).addTo(this.map).bindPopup(this.lugar.name);

}

ngOnDestroy() {
  this.map.remove();
}
}





