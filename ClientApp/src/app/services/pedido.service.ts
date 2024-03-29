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
export class PedidoService {
  token = null;
  dato;
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
    return this.http.get(`${this.servidor}/api/vistas/pedido`, {
      headers: headers,
    });
  }
  detalle(token, id_pedido): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.get(
      `${this.servidor}/api/vistas/pedidoDetalle/` + id_pedido,
      {
        headers: headers,
      }
    );
  }
  save(token, data): Observable<any> {
    let headers = new HttpHeaders().set("Authorization", token);

    return this.http.post(`${this.servidor}/api/pedido`, data, {
      headers: headers,
    });
  }

  edit(data, token, id_combo) {
    let headers = new HttpHeaders().set("Authorization", token);
    return this.http.put(`${this.servidor}/api/pedido/` + id_combo, data, {
      headers: headers,
    });
  }
  notification() {
    this.dato = {
      notification: {
        title: "Ibloom Express",
        body: "Nuevo pedido registrado",
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
      to: "/topics/drivers",
      priority: "high",
    };
    let headers = new HttpHeaders().set(
      "Authorization",
      "key=AAAAN4waqJA:APA91bGyHIgTqk9zdVYH7ZdssvG_rrQCPznyx5oq7xN5kW2u-jNE36nN3Vhh-iydzF-YVPTO1n8bScAQYylWlctANayXjZVEkKa8FfWiAb-S5yA8ijLOB4puX-QcFYpScbzGq144f-NC"
    );
    headers = headers.append("Content-Type", "application/json");

    return this.http.post("https://fcm.googleapis.com/fcm/send", this.dato, {
      headers: headers,
    });
  }
}
