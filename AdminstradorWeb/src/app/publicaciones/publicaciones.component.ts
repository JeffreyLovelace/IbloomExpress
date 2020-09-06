import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../services/publicaciones.service';
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
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  formGroup: FormGroup;
  files: any[];
  p: number = 1;
  publicaciones;
  constructor(  
    private PublicacionesService: PublicacionesService,
    private formBuilder: FormBuilder,
    ) 
    { 
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
    });
    this.get();
  }
  onFileChange(event) {
    const file = event.target.files[0];
    this.formGroup.get('foto').setValue(file);
  }
  ngOnInit(): void {
  }
  save() {
    const asd = new FormData();
    asd.append('nombre', this.formGroup.get('nombre').value);
    asd.append('foto', this.formGroup.get('foto').value);


  
      this.PublicacionesService.save(asd).subscribe((data) => {
        alert("GUARDADO");
        this.get();
  
      }, () => {
        alert('Ocurrió un error guardar');
      });

  }
  eliminar(id) {
    this.PublicacionesService.eliminar(id).subscribe((data) => {
      this.publicaciones = data;
      this.get();
    }, () => {
      alert('Ocurrió un error al eliminar el dato');
    });
  }
  get(){
    this.PublicacionesService.get().subscribe((data) => {
      this.publicaciones=data;
    }, () => {
      alert('Ocurrió un error al mostrar datos');
    });
  }
}