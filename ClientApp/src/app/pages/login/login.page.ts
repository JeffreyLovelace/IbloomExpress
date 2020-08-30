import { Component, OnInit } from "@angular/core";

import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";
import { WindowService } from "../../services/window.service";
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
  telefono = {
    telefono: "",
  };
  windowRef: any;
  prefix: any;
  line: any;
  verifCode: any;
  correo = "";
  constructor(
    private router: Router,
    private authService: AuthService,
    private googlePlus: GooglePlus,
    private storage: Storage,
    public alertController: AlertController,
    private firebaseAuthentication: FirebaseAuthentication
  ) {
    /* this.firebaseAuthentication.onAuthStateChanged().subscribe((user) => {
      if (user) {
        alert(JSON.stringify(user));
        this.alertController.dismiss;
        alert("estamos aca");
        this.login();
      }
    });*/
  }

  //Initiate windowRef from WindowService
  number;
  ngOnInit() {}
  onSubmit() {
    this.router.navigateByUrl("/ubicacion");
  }
  enviarMensaje() {
    this.firebaseAuthentication
      .verifyPhoneNumber("+591" + this.number.toString(), 30000)
      .then((verificationid) => {
        //alert(verificationid);
        this.verificarCodigo(verificationid);
      });
  }
  async verificarCodigo(verificationid) {
    const prompt = await this.alertController.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Ingrese el código de verificación",
      inputs: [
        {
          name: "code",
          type: "number",
          placeholder: "Ingresa tu código de verificación",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Confirmar ",
          handler: (response) => {
            const smsCode = response.code;
            this.firebaseAuthentication
              .signInWithVerificationId(verificationid, smsCode)
              .then(
                (data) => this.saveNumber(),
                (error) => alert("Código incorrecto")
              );
          },
        },
      ],
    });

    await prompt.present();
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
  saveNumber() {
    this.telefono = {
      telefono: this.number,
    };
    this.authService.saveCellphone(this.telefono);

    this.router.navigateByUrl("/ubicacion");
  }
  login() {
    this.authService.login1(this.credentials);
    this.router.navigateByUrl("/ubicacion");
  }
}
