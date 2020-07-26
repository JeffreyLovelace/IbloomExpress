import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./services/auth.service";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
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
    public alertController: AlertController
  ) {
    this.initializeApp();
    this.verificar();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.verificar();

      this.statusBar.styleLightContent();

      this.splashScreen.hide();
    });
  }
  verificar() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.authService.getUser(res).subscribe((response) => {
          if (response.id_rol == "1") {
            this.router.navigate(["ubicacion"]);
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
}
