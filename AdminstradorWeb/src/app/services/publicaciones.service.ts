import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  API_ENDPOINT= environment.url; 

  constructor(private httpClient: HttpClient) {

   }
  
   save(data:any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem("token"));
    return this.httpClient.post(this.API_ENDPOINT+`/publicacion`,data,{headers: headers});
  }
  get(): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.get(this.API_ENDPOINT+`/publicacion`,{headers: headers});
  }
  eliminar(id:any): Observable<any> {
    var data={
      'estadoEliminado':0
    };
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.put(this.API_ENDPOINT+`/publicacion/`+id,data,{headers: headers});
  }
}
