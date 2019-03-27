import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Estado } from '../../models/estado.model';
import { EstadoService } from '../../services/service.index';


@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styles: []
})
export class EstadosComponent implements OnInit {

  estado: FormGroup ;
  color:string;
  tipo:string;

  colorExistente:string;

  constructor(
    public _estadoService: EstadoService,
  ) { }

  ngOnInit() {

    this.estado = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      color: new FormControl( null, Validators.required ),
      tipo: new FormControl( null, Validators.required )
    });

  }

  crearEstado(){

    // if ( this.estado.invalid ) {
    //   console.log(this.estado);
    //   return;
    // }

    const estado = new Estado(
      this.estado.value.nombre,
      this.color,
      this.estado.value.tipo
    );

    this._estadoService.crearEstado( estado )
            .subscribe( resp => {
              console.log(resp);
            });
  }


}
