import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Solicitud } from '../model/solicitud';

@Injectable({
  providedIn: 'root'
})

export class RequestCreateService {

  private myCollection: AngularFirestoreCollection<any>;
  
  constructor(private fire: AngularFirestore
    ) { 
      this.myCollection = fire.collection<any>(environment.solicitudesCollection);
    }

    agregaSolicitud(nuevaSolicitud: Solicitud): Promise<any> {

      return this.myCollection.add(nuevaSolicitud);
  
    }
  
  
    leeSolicitudes(): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
  
      return this.myCollection.get();
    }
    leeSolicitud(id: any): Observable<any> {
      return this.myCollection.doc(id).get();
  
    }
    actualizaSolicitud(id: any, nuevaSolicitud: Solicitud): Promise<void> {
      return this.myCollection.doc(id).update({ name: nuevaSolicitud.name, adress: nuevaSolicitud.adress, n_phone: nuevaSolicitud.n_phone });
    }
  
    borraSolicitud(id: any): Promise<void> {
      return this.myCollection.doc(id).delete();
    }
  
  
  }
  