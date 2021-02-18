import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { comentarios } from '../model/comentarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {


  private myCollectionComentario:AngularFirestoreCollection<any>;
  constructor(private fire:AngularFirestore,
    ) { 
    this.myCollectionComentario=fire.collection<any>(environment.comentariosCollection);
}



agregaComentario(nuevoComentario:comentarios):Promise<any>{
    
  return this.myCollectionComentario.add(nuevoComentario);
}
leeComentarios():Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{

 return this.myCollectionComentario.get();
}
leeComentario(id:any):Observable<any>{
  return this.myCollectionComentario.doc(id).get();
  
}

borraComentario(id:any):Promise<void>{
  return this.myCollectionComentario.doc(id).delete();
}

}
