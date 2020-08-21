import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_ENDPOINT= environment.url; 
  constructor(private httpClient: HttpClient) {

   }
  
  login(datos){
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/auth/login', datos, {headers: headers});

  }
  auth(){
    const headers = new HttpHeaders( {'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem("token")});
    return this.httpClient.get(this.API_ENDPOINT + '/auth/user',{headers: headers});
  }
  loginAdmin(datos){
    const headers = new HttpHeaders( {'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + '/auth/loginAdmin', datos, {headers: headers});

  }
}
