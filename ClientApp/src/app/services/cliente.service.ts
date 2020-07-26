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
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { auth } from "firebase";
const helper = new JwtHelperService();
const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  public user: Observable<any>;
  servidor = environment.url;
  public rol = null;
  token = null;
  constructor(private http: HttpClient) {}
  get(token): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(this.servidor + "/api/cliente", {
      headers: headers,
    });
  }
}
