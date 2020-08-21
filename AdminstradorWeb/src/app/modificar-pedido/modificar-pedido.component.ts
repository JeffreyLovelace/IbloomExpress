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
  selector: 'app-modificar-pedido',
  templateUrl: './modificar-pedido.component.html',
  styleUrls: ['./modificar-pedido.component.css']
})
export class ModificarPedidoComponent implements OnInit {
  formGroup: FormGroup;
  files: any[];
  p: number = 1;
  id: any;
  pedidos={
    'nit':null, 
    'razonSocial':null, 
    'nota':null, 
    'tiempoDelivery':null, 
    'id_conductor':null,
    'id_estado':null
  };
  constructor(
    private PedidosService: PedidosService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {

    this.id = this.activatedRoute.snapshot.params['id'];

    this.get();
  }
  ngOnInit(): void {
  }
  modificar() {

    this.PedidosService.actualizar(this.id, this.pedidos).subscribe((data) => {
      alert("GUARDADO");
      this.router.navigate(['/pedidos']);
    }, () => {
      alert('Ocurrió un error guardar');
    });

  }
  get() {
    this.PedidosService.detalle(this.id).subscribe((data) => {
      this.pedidos = data[0];
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  } 
}
