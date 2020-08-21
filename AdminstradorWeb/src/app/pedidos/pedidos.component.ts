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
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
 
  
  filtertext ='';
  selected;
    p: number = 1;
    pedidos;
    constructor(  
      private PedidosService: PedidosService,
      ) 
      { 

      this.get();
    }

    ngOnInit(): void {
    }
    get(){
      this.PedidosService.get().subscribe((data) => {
        this.pedidos=data;
      }, () => {
        alert('Ocurrió un error al mostrar datos');
      });
    }
  }
