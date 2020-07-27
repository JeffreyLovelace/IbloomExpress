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
const helper = new JwtHelperService();
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root",
})
export class ComboService {
  token = null;
  servidor = environment.url;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  get(token): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(`${this.servidor}/api/combo`, {
      headers: headers,
    });
  }
  detail(token, id): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(`${this.servidor}/api/combo/` + id, {
      headers: headers,
    });
  }
}
