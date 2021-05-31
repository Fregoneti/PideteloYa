import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private fcm: FCM,
    private localNotifications: LocalNotifications,
    private platform: Platform,
    private authS: AuthService) { }



    public initNotifications() {

      if (this.platform.is("android")) {
        this.fcm.getToken().then(token => {
          this.authS.user.token = token;
          console.log(token);
  
        }).catch(err =>{
          console.log("No push token");
          
        });
  
        this.fcm.onNotification().subscribe(data => {
          console.log(data);
          if (data.wasTapped) {
            console.log('Received in background');
          } else {
  
            // this.localNotifications.schedule({
            //   id: 1,
            //   title: data.title,
            //   text: data.body,
            //   icon: "file://../../assets/icon/favicon.png"
            // });
  
            
            this.localNotifications.schedule({
              id: 1,
              title: data.title,
              text: data.body,
            });
  
            console.log('Received in foreground');
          }
        });
      }
  
    }
  }
