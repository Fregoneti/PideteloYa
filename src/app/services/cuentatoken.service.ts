import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentatokenService {


  private myCollection: AngularFirestoreCollection<any>;

  constructor(private fire: AngularFirestore,
  ) {
    this.myCollection = fire.collection<any>(environment.userCollection);
    
    //this.myCollectionC=fire.collection<any>(environment.comentariosCollection)
  }


  agregaCuentaToken(cuenta: any): Promise<any> {

    return this.myCollection.add(cuenta);

  }

  leeToken(): Observable<any> {
   
    return this.myCollection.get();

  }
}
