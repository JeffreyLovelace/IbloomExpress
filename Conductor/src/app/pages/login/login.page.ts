import { Component, OnInit } from "@angular/core";

import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { LoadingController } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { InformacionService } from "../../services/informacion.service";
import { Informacion } from "../../interfaces/informacion";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  credentials = {
    email: "driver@gmail.com",
    password: "driver",
    remember_me: true,
  };
  informaciones: Informacion[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private informacionService: InformacionService,
    private loadingController: LoadingController
  ) {
    this.getInformacion();
  }

  ngOnInit() {}
  onSubmit() {
    this.router.navigateByUrl("/tabs");
  }
  async login() {
    const loading = await this.loadingController.create();
    loading.present();
    this.authService.login1(this.credentials);
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
