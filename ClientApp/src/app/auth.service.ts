import { Injectable } from '@angular/core';
import { GooglePlus} from "@ionic-native/google-plus/ngx"
import { auth } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private google:GooglePlus) { }

}
