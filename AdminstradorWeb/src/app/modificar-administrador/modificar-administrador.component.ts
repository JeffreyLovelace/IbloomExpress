import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../services/administrador.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modificar-administrador',
  templateUrl: './modificar-administrador.component.html',
  styleUrls: ['./modificar-administrador.component.css']
})
export class ModificarAdministradorComponent implements OnInit {


  id:any;
  p: number = 1;
  administrador={
    'correo':null,
    'telefono':null
  };
  constructor(  
    private AdministradorService: AdministradorService,
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

    this.AdministradorService.actualizar(this.id,this.administrador).subscribe((data) => {
        alert("GUARDADO");  
        this.router.navigate(['/administrador']);
      }, () => {
        alert('Ocurrió un error guardar');
      });

  }
  get(){
    this.AdministradorService.detalle(this.id).subscribe((data) => {
      this.administrador=data[0];
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
}