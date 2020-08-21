import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {}

  async login() {
    const loading = await this.loadingController.create();
    loading.present();
    this.auth.login1(this.credentials);
    this.router.navigate(["tabs"]);

    loading.dismiss();
  }
}
