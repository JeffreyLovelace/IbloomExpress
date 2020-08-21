import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-pedidos-historico',
  templateUrl: './pedidos-historico.component.html',
  styleUrls: ['./pedidos-historico.component.css']
})
export class PedidosHistoricoComponent implements OnInit {
 
  
  filtertext ='';
  selected;
    p: number = 1;
    pedidos;
    total=0;
    porcentaje=10;
    desde;
    hasta;
    id_comercio;
    constructor(  
      private PedidosService: PedidosService,
      ) 
      { 

      this.get();
    }

    ngOnInit(): void {
    }
    get(){
      var data={
        'id':this.id_comercio,
        'in':this.desde,
        'out':this.hasta
      };
      
      this.PedidosService.getHist(data).subscribe((data) => {
        this.pedidos=data;

        for(var i=0;i<data.length;i++){
          this.total=this.total+data[i]["total"];
        }
      }, () => {
        alert('Ocurrió un error al mostrar datos');
      });
    }
  }
