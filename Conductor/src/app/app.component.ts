import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { AuthService } from "./services/auth.service";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { InformacionService } from "./services/informacion.service";
import { Informacion } from "./interfaces/informacion";
const TOKEN_KEY = "access_token";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  informaciones: Informacion[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController,
    private fcm: FCM,
    private informacionService: InformacionService
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
      this.getInformacion();

      // subscribe to a topic
      // this.fcm.subscribeToTopic('Deals');

      // get FCM token

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
  telefono;
  getInformacion() {
    this.informacionService.get().subscribe((data: Informacion[]) => {
      this.informaciones = data;
      this.telefono = this.informaciones[0].telefono;
      console.log("telefono" + this.telefono);
    });
  }
}
