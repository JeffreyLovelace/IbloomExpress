import { Component, OnInit } from "@angular/core";

import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

import { AuthService } from "../../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user = { email: null, password: null };

  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit() {}
  onSubmit() {
    this.router.navigateByUrl("/ubicacion");
  }
  loginGoogle(){
    alert(this.authService.loginWithGoogle());
  }
}
