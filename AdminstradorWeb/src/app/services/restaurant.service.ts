import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore } from '@angular/fire/firestore';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  API_ENDPOINT= environment.url; 

  constructor(private httpClient: HttpClient,
    private AngularFirestore:AngularFirestore
    ) {

   }
  
   saveUsers(data:any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization','Bearer ');
    return this.httpClient.post(this.API_ENDPOINT+`/auth/signup`,data,{headers: headers});
  }
  save(data:any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization','Bearer ');
    return this.httpClient.post(this.API_ENDPOINT+`/comercio`,data,{headers: headers});
  }
  get(): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.get(this.API_ENDPOINT+`/comercio`,{headers: headers});
  }
  gettipoNegocios(): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.get(this.API_ENDPOINT+`/tipoComercio`,{headers: headers});
  }
  eliminar(id:any): Observable<any> {
    var data={
      'estadoEliminado':0
    };
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.put(this.API_ENDPOINT+`/comercio/`+id,data,{headers: headers});
  }
  detalle(id:any): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.get(this.API_ENDPOINT+`/comercio/`+id,{headers: headers});
  }
  actualizar(id:any,data:any): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.put(this.API_ENDPOINT+`/comercio/`+id,data,{headers: headers});
  }


  read_Students() {
    return this.AngularFirestore.collection('Cordenadas').snapshotChanges();
  }
}
