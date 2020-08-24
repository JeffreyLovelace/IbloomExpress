import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { InformacionService } from "../../services/informacion.service";
import { Informacion } from "../../interfaces/informacion";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  credentials = {
    email: "",
    password: "",
    remember_me: true,
  };
  informaciones: Informacion[];

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private informacionService: InformacionService
  ) {
    this.getInformacion();
  }

  async login() {
    const loading = await this.loadingController.create();
    loading.present();
    this.auth.login1(this.credentials);
    this.router.navigate(["tabs"]);

    loading.dismiss();
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
