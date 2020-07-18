import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Observable, from, of } from "rxjs";
import { take, map, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

const helper = new JwtHelperService();
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  authenticationState = new BehaviorSubject(false);
  token = null;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    private alertCtrl: AlertController
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
      .post("http://177.222.52.26:8000/api/auth/login", credentials)
      .subscribe(async (res) => {
        if (res) {
          this.router.navigateByUrl("/tabs");
          this.token = res[TOKEN_KEY];
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
      });
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl("/");
      this.userData.next(null);
    });
  }
}
