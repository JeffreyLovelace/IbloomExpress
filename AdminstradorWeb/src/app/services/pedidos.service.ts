import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  API_ENDPOINT= environment.url; 


  constructor(private httpClient: HttpClient) {

   }
  

  get(): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.get(this.API_ENDPOINT+'/vistas/pedidoAct',{headers: headers});
  }
  actualizar(id:any,data:any): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.put(this.API_ENDPOINT+`/pedido/`+id,data,{headers: headers});
  }
  detalle(id:any): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.get(this.API_ENDPOINT+`/pedido/`+id,{headers: headers});
  }
  
  getHist(data): Observable<any> {
    const headers = new HttpHeaders( {'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.post(this.API_ENDPOINT+'/vistas/pedidoHist',data,{headers: headers});
  }
}
