import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Estante } from '../../../models/estante.model';
import { Lugar } from '../../../models/lugar.model';
import { DepositoService, CajaService } from '../../../services/service.index';
import { from } from 'rxjs';
import { map, filter, distinct, bufferCount } from 'rxjs/operators';

import swal from 'sweetalert2';


@Component({
  selector: 'app-configurar-deposito',
  templateUrl: './configurar-deposito.component.html',
  styles: []
})
export class ConfigurarDepositoComponent implements OnInit {

  index: number;
  color: string;

  depositos: Estante[] = [];
  estantes: Array<any> = [];
  posiciones: Array<any> = [];

  estante: FormGroup ;
  matriz: Array<any> = [];

  depositoSeleccionado: string;
  estanteSeleccionado: string;
  posicionSeleccionado: number;

  lugares: Lugar[] = [];
  lugarBuscado: string = '';
  filas: number;
  columnas: number;

  armar: Array<any> = [];

  cajaSelec: Array<any> = [];
  cajita: boolean = false;

  constructor(
    public _fb: FormBuilder,
    public _depositoService: DepositoService,
    public _cajaService: CajaService

  ) { }

  ngOnInit() {

    this.estante = this._fb.group({
      deposito: new FormControl( '', Validators.required ),
      nombre: new FormControl( '', Validators.required ),
      posicion: new FormControl( '', Validators.required ),
      filas: new FormControl( '', Validators.required ),
      columnas: new FormControl( '', Validators.required )
    });

    this.obtenerEstantes();

  }
  
  cargarCaja( id: string ){

    this._cajaService.obtenerCajaParaModal( id )
        .subscribe( (resp:any) => {
          this.cajaSelec = [];
          this.cajita = false;
          if (resp.cajas[0] == undefined){
            return
          } else {
            this.cajaSelec.push(resp.cajas[0]); 
            this.cajita = true;
            console.log(this.cajaSelec);
          }
        });
  }
  
  obtenerEstantes(){    
    this._depositoService.obtenerEstantes()
          .subscribe( (resp:any) => {
            this.depositos = resp.Estantes;
    });
  }

  liberarLugar( id: string ){
    this._depositoService.liberarLugar( id)
            .subscribe( resp => {
              console.log(resp);
              this.cajaSelec = [];
              this.cajita = false;
  
              this._depositoService.obtenerLugares( this.lugarBuscado )
              .subscribe( (resp:any) => {
                this.lugares = resp.lugares;
    
                this.armar = [];
      
                from(this.lugares)
                    .pipe(
                      bufferCount(this.columnas),
                      )
                    .subscribe((x) => { this.armar.push(x) } );
                  });
            })
  }

  guardarEstante() {

    if ( this.estante.invalid ) {
      console.log(this.estante);
      return;
    }

    this.matriz = []

    const estanteria = new Estante(
      this.estante.value.deposito,
      this.estante.value.nombre,
      this.estante.value.posicion,
      this.estante.value.filas,
      this.estante.value.columnas
    );

    let nombre: string = this.estante.value.nombre + "-" + this.estante.value.posicion + "-"; 

    var m = 1;

    for (let i=1; i <= this.estante.value.filas; i++) {

      for (let j=1; j <= this.estante.value.columnas; j++) {

        let lugarcito = new Lugar(
          nombre + m
        );

        this.matriz.push(lugarcito);

        m++;
      }
      
    }
    
    this.matriz.unshift(estanteria);

    this._depositoService.crearEstante( this.matriz )
            .subscribe( resp => { 
              this.matriz = [];

              swal({
                title: 'Estante creado',
                text: 'Se ha generado un nuevo estante .',
                type: 'success',
                confirmButtonText: 'Ok'
              })

              this.estante.reset();
              this.estante.markAsPristine();
              this.estante.markAsUntouched();

              this.obtenerEstantes();
    });

  }

  cambioDeposito( id: string ){
    
    this.estantes = [];
    this.posiciones = [];

    this.estanteSeleccionado = '';
    this.posicionSeleccionado = 0;

    from(this.depositos)
        .pipe(
        filter(depo => depo.deposito == id),
        distinct( depo => depo.nombre)
        )
        .subscribe(val => {this.estantes.push(val)});
  }

  cambioEstante( nombre: string ){

    this.posiciones = [];

    this.posicionSeleccionado = 0;

    from(this.depositos)
        .pipe(
        filter(depo =>  depo.deposito == this.depositoSeleccionado && depo.nombre == nombre),
        distinct( depo => depo.posicion)
        )
        .subscribe(val => this.posiciones.push(val));
  }

  cambioPosicion(posicion: number){

    this.posicionSeleccionado = posicion;
    this.lugarBuscado = '';
    this.filas = 0;
    this.columnas = 0;
    this.lugares = [];

    from(this.depositos)
        .pipe(
        filter(depo => depo.deposito == this.depositoSeleccionado && depo.nombre == this.estanteSeleccionado && depo.posicion == this.posicionSeleccionado ),
        map( depo => depo )
        )
        .subscribe( (val) => { 
          this.lugarBuscado = val._id;
          this.filas = val.filas;
          this.columnas = val.columnas;
        });

    this._depositoService.obtenerLugares( this.lugarBuscado )
          .subscribe( (resp:any) => {
            this.lugares = resp.lugares;

            this.armar = [];
  
            from(this.lugares)
                .pipe(
                  bufferCount(this.columnas),
                  )
                .subscribe((x) => { this.armar.push(x) } );
    });
    
  }

  guardarEstado(){

  }

}
