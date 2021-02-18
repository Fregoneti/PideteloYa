import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment.prod';
import { Lugar } from '../model/lugar';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { comentarios } from '../model/comentarios';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  private myCollection:AngularFirestoreCollection<any>;

  constructor(private fire:AngularFirestore,
    private auth: AuthService) { 
    this.myCollection=fire.collection<any>(environment.lugaresCollection);
   //this.myCollectionC=fire.collection<any>(environment.comentariosCollection)
  }


  agregaLugar(nuevoLugar:Lugar):Promise<any>{
    
    return this.myCollection.add(nuevoLugar);
    
  }


  leeLugares():Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
 
   return this.myCollection.get();
  }
  leeLugar(id:any):Observable<any>{
    return this.myCollection.doc(id).get();
    
  }
  actualizaLugar(id:any,nuevoLugar:Lugar):Promise<void>{
    return this.myCollection.doc(id).update({name:nuevoLugar.name,adress:nuevoLugar.adress,n_phone:nuevoLugar.n_phone});
  }
  
  borraNota(id:any):Promise<void>{
    return this.myCollection.doc(id).delete();
  }
 
  //COMENTARIOS
  
  agregaComentario(id:any, nuevoComentario:comentarios):Promise<any>{
    
    return this.myCollection.doc(id).collection('comentarios').add(nuevoComentario);
  }

  leerComentarios(id:any):Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
   
   return this.myCollection.doc(id).collection('comentarios').get();
  
   }

}
