import { Component, OnInit } from "@angular/core";

import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

import { AuthService } from "../../services/auth.service";
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: Storage
  ) {}

  ngOnInit() {}
  onSubmit() {
    this.router.navigateByUrl("/tabs");
  }
  login() {
    this.authService.login1(this.credentials);
  }
}
