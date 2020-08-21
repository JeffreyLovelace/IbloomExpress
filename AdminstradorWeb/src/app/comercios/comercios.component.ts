import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';

import { AngularFirestore } from 'angularfire2/firestore';
import{environment} from '../../environments/environment'
@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.css']
})
export class ComerciosComponent implements OnInit {
 icon = {
    url: 'https://image.flaticon.com/icons/svg/609/609361.svg',
    scaledSize: { height: 40, width: 40 },
  };
  texto : string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
puntos;
  constructor(
    private RestaurantService: RestaurantService,

  ) { 
    this.get();
  }

  ngOnInit(): void {
  }
  get(){
    this.RestaurantService.get().subscribe((data) => {
      this.puntos=data

      for(var i=0;i<data.length;i++){
        this.puntos[i]['foto']={url:environment.dominio+"/imagenes/"+data[i]['fotoLogo'],scaledSize: { height: 30, width: 30 }};
      }
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
}
