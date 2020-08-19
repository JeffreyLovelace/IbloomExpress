import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Observable, from, of } from "rxjs";
import { take, map, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { environment } from "../../environments/environment";
import { LoadingController } from "@ionic/angular";
import { ComercioService } from "../services/comercio.service";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

const helper = new JwtHelperService();
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: Observable<any>;
  servidor = environment.url;
  public rol = null;
  correo;
  tokenUpdate = {};
  private userData = new BehaviorSubject(null);
  authenticationState = new BehaviorSubject(false);
  token = null;
  idComercio;
  token1;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private comercioService: ComercioService,
    private fcm: FCM
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }
  checkToken() {
    return this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }
  loadStoredToken() {
    let platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map((token) => {
        if (token) {
          this.authenticationState.next(true);
          let decoded = helper.decodeToken(token);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  login1(credentials: {
    email: string;
    password: string;
    remember_me: boolean;
  }) {
    return this.http
      .post(`${this.servidor}/api/auth/login`, credentials)
      .subscribe(
        async (res) => {
          if (res) {
            this.verificarRol();
            this.token = res[TOKEN_KEY];
            console.log(res);

            return this.storage
              .set(TOKEN_KEY, `Bearer ${res[TOKEN_KEY]}`)
              .then((res) => {
                this.authenticationState.next(true);
              });
          } else {
            const alert = await this.alertCtrl.create({
              mode: "ios",
              header: "Error de inicio de sesión",
              message: "Credenciales incorrectas.",
              buttons: ["Aceptar"],
            });
            await alert.present();
          }
        },
        (error) => this.presentAlert("Credenciales incorrectas.")
      );
  }
  getUser(token): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(this.servidor + "/api/auth/user", {
      headers: headers,
    });
  }
  verificarRol() {
    this.storage.get(TOKEN_KEY).then((res) => {
      if (res) {
        this.getUser(res).subscribe((response) => {
          if (response.id_rol == "3") {
            this.correo = response.email;
            this.getComercio();
            this.router.navigateByUrl("/tabs");
          } else {
            this.logout();
            this.presentAlert("No puede ingresar a esta aplicación");
          }
        });
      }
    });
  }
  //data, token, id
  getComercio() {
    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService.get(res).subscribe((data) => {
        for (let datos of data) {
          if (datos.correo == this.correo) {
            this.idComercio = datos.id;
          } else {
            console.log("no existe");
          }
        }
        this.updateToken();
      });
    });
  }
  updateToken() {
    this.fcm.getToken().then((token) => {
      console.log(token);
      this.token1 = token;
      this.tokenUpdate = {
        token: this.token1,
      };
    });

    this.storage.get(TOKEN_KEY).then((res) => {
      this.comercioService
        .edit(this.tokenUpdate, res, this.idComercio)
        .subscribe((res) => {
          console.log(res);
        });
    });
  }
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl("/login");
      this.userData.next(null);
      navigator["app"].exitApp();
    });
  }
  async presentAlert(Mensaje) {
    const alert = await this.alertCtrl.create({
      mode: "ios",
      cssClass: "my-custom-class",
      header: "Error",

      message: Mensaje,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
