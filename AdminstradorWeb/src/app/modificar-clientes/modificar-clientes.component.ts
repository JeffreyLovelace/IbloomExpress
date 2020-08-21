import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modificar-clientes',
  templateUrl: './modificar-clientes.component.html',
  styleUrls: ['./modificar-clientes.component.css']
})
export class ModificarClientesComponent implements OnInit {
  id:any;
  p: number = 1;
  cliente={
    'pNombre':null, 
    'sNombre':null,
    'pApellido':null, 
    'sApellido':null,
    'fechaNacimiento':null, 
    'telefono':null, 
    'correo':null
  };
  constructor(  
    private ClienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) 
    { 
    this.id =this.activatedRoute.snapshot.params['id'];

    this.get();
  }
  ngOnInit(): void {
  }
  modificar() {
    const asd = new FormData();

    this.ClienteService.actualizar(this.id,this.cliente).subscribe((data) => {
        alert("GUARDADO");  
        this.router.navigate(['/clientes']);
      }, () => {
        alert('Ocurrió un error guardar');
      });

  }
  get(){
    this.ClienteService.detalle(this.id).subscribe((data) => {
      this.cliente=data[0];
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
}