
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  API_ENDPOINT = environment.url;

  constructor(private httpClient: HttpClient) {

  }

  actualizar(id: any, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
    return this.httpClient.put(this.API_ENDPOINT + `/informacion/` + id, data, { headers: headers });
  }
  get(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' + localStorage.getItem("token") });
    return this.httpClient.get(this.API_ENDPOINT + `/informacion`, { headers: headers });
  }
}
