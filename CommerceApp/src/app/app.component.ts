import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./services/auth.service";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
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
  existe;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private informacionService: InformacionService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.verificar();
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.getInformacion();
      this.splashScreen.hide();
    });
  }

  async verificar() {
    const loading = await this.loadingController.create();
    loading.present();
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.existe = true;
        this.authService.getUser(res).subscribe((response) => {
          if (response.id_rol == "3") {
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
    loading.dismiss();
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
