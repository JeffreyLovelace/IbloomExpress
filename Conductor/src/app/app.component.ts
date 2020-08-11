import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { AuthService } from "./services/auth.service";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

const TOKEN_KEY = "access_token";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController,
    private fcm: FCM
  ) {
    this.initializeApp();
    this.verificar();
  }
  verificar() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.authService.getUser(res).subscribe((response) => {
          if (response.id_rol == "2") {
            this.router.navigate(["tabs"]);
          } else {
            this.authService.logout();
            this.presentAlert();
          }
        });
      } else {
        this.router.navigate(["/login"]);
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      // subscribe to a topic
      // this.fcm.subscribeToTopic('Deals');

      // get FCM token
      this.fcm.getToken().then((token) => {
        console.log(token);
      });
      this.fcm.subscribeToTopic("drivers");
      console.log("driver suscribe");

      // ionic push notification example
      this.fcm.onNotification().subscribe((data) => {
        console.log(data);
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        }
      });

      // refresh the FCM token
      /*   this.fcm.onTokenRefresh().subscribe((token) => {
        console.log(token);
      });*/

      // unsubscribe from a topic
      // this.fcm.unsubscribeFromTopic('offers');
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Error",

      message: "No puede ingresar a esta aplicación",
      buttons: ["OK"],
    });

    await alert.present();
  }
  logout() {
    this.authService.logout();
    console.log("salir");
  }
}
