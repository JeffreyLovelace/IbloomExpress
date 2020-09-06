import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { EstadoService } from '../services/estado.service';
import { ConductorService } from '../services/conductor.service';
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
  estados;
  conductores;
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
    private router: Router,
    private EstadoService: EstadoService,
    private ConductorService:ConductorService

  ) {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.formGroup = this.formBuilder.group({
      id_estado: new FormControl('', Validators.required),
      nit: new FormControl('', Validators.required),
      razonSocial: new FormControl('', Validators.required),
      nota: new FormControl('', Validators.required),
      tiempoDelivery: new FormControl('', Validators.required),
      id_conductor: new FormControl('', Validators.required),
    });
    this.get();
    this.getEstado();
    this.getConductor();
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
  getEstado() {
    this.EstadoService.get().subscribe((data) => {
      this.estados = data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
  getConductor() {
    this.ConductorService.get().subscribe((data) => {
      this.conductores = data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
}
