import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TipoCajaService } from '../../services/service.index';
import { TipoCaja } from '../../models/tipocaja.model';

@Component({
  selector: 'app-tipos-caja',
  templateUrl: './tipos-caja.component.html',
  styles: []
})
export class TiposCajaComponent implements OnInit {

  tipocaja: FormGroup ;

  constructor(
    public _estadoService: TipoCajaService,
  ) { }

  ngOnInit() {

    this.tipocaja = new FormGroup({
      nombre: new FormControl( null, Validators.required )
    });

  }

  crearEstado(){

    // if ( this.estado.invalid ) {
    //   console.log(this.estado);
    //   return;
    // }

    const tipodecaja = new TipoCaja(
      this.tipocaja.value.nombre
    );

    this._estadoService.crearTipoCaja( tipodecaja )
            .subscribe( resp => {
              console.log(resp);
            });
  }


}
