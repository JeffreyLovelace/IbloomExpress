import { Injectable } from '@angular/core';
import { GooglePlus} from "@ionic-native/google-plus/ngx"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private google:GooglePlus) { }
  loginWithGoogle(){
    this.google.login({}).then(result=>{
      return result;
    })
  }
}
