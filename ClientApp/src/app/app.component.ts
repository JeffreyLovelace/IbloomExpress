import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { NavController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./services/auth.service";
import { Storage } from "@ionic/storage";
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

  correo;
  name;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private storage: Storage,
    public alertController: AlertController,
    private navController: NavController,
    private informacionService: InformacionService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.verificar1();

      //this.getInformacion();
      this.splashScreen.hide();
    });
  }

  verificar() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.authService.getUser(res).subscribe((response) => {
          if (response.id_rol == "1") {
            this.navController.navigateForward(["ubicacion"]);
            this.correo = response.email;
            this.name = response.name;
          } else {
            this.authService.logout();
            this.presentAlert();
          }
        });
      } else {
        this.navController.navigateForward(["/login"]);
      }
    });
  }
  verificar1() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.authService.getUser(res).subscribe((response) => {
          this.navController.navigateForward(["ubicacion"]);
          this.correo = response.email;
          this.name = response.name;
        });
      } else {
        this.navController.navigateForward(["/login"]);
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
  logout() {
    this.authService.logout();
  }

  telefono;
  getInformacion() {
    this.informacionService.get().subscribe((data: Informacion[]) => {
      this.informaciones = data;
      this.telefono = this.informaciones[0].telefono;
    });
  }
}
