import { Component, OnInit } from '@angular/core';
import { TipoNegocioService } from '../services/tipo-negocio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { MouseEvent } from '@agm/core';

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
  selector: 'app-tipo-negocio',
  templateUrl: './tipo-negocio.component.html',
  styleUrls: ['./tipo-negocio.component.css']
})
export class TipoNegocioComponent implements OnInit {
    formGroup: FormGroup;
    files: any[];
    p: number = 1;
    tipoNegocios;

    constructor(
      private TipoNegocioService: TipoNegocioService,
      private formBuilder: FormBuilder,
    ) {
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
      if (this.formGroup.valid) {
        const asd = new FormData();
       
        asd.append('nombre', this.formGroup.get('nombre').value);
        asd.append('foto', this.formGroup.get('foto').value);
       
  

          this.TipoNegocioService.save(asd).subscribe((data) => {
            alert('GUARDADO');
            console.log(data);
            this.get();
          }, () => {
            alert('Ocurrió un error guardars');
  
          });
  
        }else{
          alert("Falta datos")
        }
  
    }
    get() {
      this.TipoNegocioService.get().subscribe((data) => {
        this.tipoNegocios = data;
      }, () => {
        alert('Ocurrió un error al mostrar datos');
      });
    }
    
    eliminar(id) {
      this.TipoNegocioService.eliminar(id).subscribe((data) => {
        this.tipoNegocios = data;
        this.get();
        console.log(id)

      }, () => {
        alert('Ocurrió un error al eliminar el dato');
      });
    }
  }