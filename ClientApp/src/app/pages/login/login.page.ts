import { Component, OnInit } from "@angular/core";

import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

import { AuthService } from "../../services/auth.service";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  credentials = {
    email: "cliente@gmail.com",
    password: "cliente",
    remember_me: true,
  };

  correo = "";
  constructor(
    private router: Router,
    private authService: AuthService,
    private googlePlus: GooglePlus,
    private storage: Storage
  ) {}

  ngOnInit() {}
  onSubmit() {
    this.router.navigateByUrl("/ubicacion");
  }

  loginGoogle() {
    this.googlePlus
      .login({
        scopes: "... ", // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        webClientId:
          "986800762959-i661ef26bobnf26sgiaccp9aorrbg3ec.apps.googleusercontent.com", // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        offline: true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then((res) => alert("bien " + res))
      .catch((err) => alert("mal " + err));
  }
  login() {
    this.authService.login1(this.credentials);
    this.router.navigateByUrl("/ubicacion");
  }
}
