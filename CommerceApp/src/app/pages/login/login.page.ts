import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  credentials = {
    email: "comercio@gmail.com",
    password: "comercio",
    remember_me: true,
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  login() {
    this.auth.login1(this.credentials);
  }
}
