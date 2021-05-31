// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  firebaseConfig : {
    apiKey: "AIzaSyBVgkOMNHL3i_uLkdhknOzho18n6lwwMMY",
    authDomain: "pideteloya-12ca3.firebaseapp.com",
    projectId: "pideteloya-12ca3",
    storageBucket: "pideteloya-12ca3.appspot.com",
    messagingSenderId: "536439917980",
    appId: "1:536439917980:web:1f4318aff1731cbb780c59",
    measurementId: "G-GD91C6K0W4"
  },
  userCollection:'User', //Subcolección de comentarios
  comentariosCollection:'Comentarios', //Subcolección de comentarios
  solicitudesCollection:'Solicitudes', //Colección de comentarios
  lugaresCollection:'Lugares', //Colección de lugares
  currentLanguages:['es','en'], //idiomas disponibles de la aplicación
  defaultLanguage:"en",  //idioma por defecto
  hackuser:"",  //super usuario
  hackpass:"",  //super password
};

export const snapshotToArray=snapshot=>{
  let returnArray=[];
  snapshot.array.forEach(element => {
    let item=element.val();
    item.key=element.key;
    returnArray.push(item);

  });
  return returnArray;
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

//https://pideteloya-12ca3.firebaseapp.com/__/auth/handler
