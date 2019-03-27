import { Component, OnInit } from '@angular/core';
import { CajaService, EtiquetaService,
         UsuarioService, EstadoService,
         TipoCajaService, DepositoService,
        SeccionesService } from '../../../services/service.index';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { Observable, from } from 'rxjs';
import { filter, distinct, map } from 'rxjs/operators';

import { Empresa } from '../../../models/empresa.model';
import { Estado } from '../../../models/estado.model';
import { TipoCaja } from '../../../models/tipocaja.model';
import { Estante } from '../../../models/estante.model';
import { Lugar } from '../../../models/lugar.model';
import { Area } from '../../../models/area.model';
import { TipoDocumento } from '../../../models/tipo-documento.model';
import { Contenido } from '../../../models/contenido.model';
import { Contenido_vista } from '../../../models/contenido_vista.model';
import { Caja } from '../../../models/caja.model';

@Component({
  selector: 'app-agregar-cajas',
  templateUrl: './agregar-cajas.component.html',
  styles: []
})
export class AgregarCajasComponent implements OnInit {

  forma: FormGroup ;
  contenido: FormGroup ;

  empresas: Empresa[] = [];
  tiposcaja: TipoCaja[] = [];
  estados: Estado[] = [];

  depositos: Estante[] = [];

  estantes: Array<any> = [];
  posiciones: Array<any> = [];

  depositoSeleccionado: string;
  estanteSeleccionado: string;
  posicionSeleccionado: number;

  lugares: Lugar[] = [];
  lugarBuscado: string = '';

  areasytipos: any[] = [];
  areasola: Array<Area> = [];
  temp: any[] = [];
  tiposolo: Array<TipoDocumento> = [];
  tipoSoloSelected: Array<TipoDocumento> = [];

  contenidoArray: Array<Contenido> = [];
  contenidoVistaArray: Array<Contenido_vista> = [];

  nombre_area: string;
  nombre_tipo: string;

  tipo_caja: string;

  registrar: Array<any>= [];

  constructor(
    public _fb: FormBuilder,
    public _cajaService: CajaService,
    public _etiquetaService: EtiquetaService,
    public _usuarioService: UsuarioService,
    public _tipoCajaService: TipoCajaService,
    public _estadoService: EstadoService,
    public _depositoService: DepositoService,
    public _seccionesService: SeccionesService,
  ) { }
  
  // 1fxfv7710jqemzzbf
  
  ngOnInit() {

    this.forma = this._fb.group({
      id_codigo: new FormControl ( '', Validators.required, [this.existeCodigo.bind( this ), this.existeCodigo2.bind(this)]),
      id_tipocaja: new FormControl( '', Validators.required ),
      id_empresa: new FormControl( '', Validators.required ),
      id_estado: new FormControl( '', Validators.required ),
      id_deposito: [],
      id_estante: [],
      id_fila: [],
      id_posicion: new FormControl( '', Validators.required )
    });

    this.contenido = this._fb.group({
      id_area: new FormControl( '', Validators.required ),
      id_tipo: new FormControl( '', Validators.required ),
      desde_n: [],
      hasta_n: [],
      desde_fecha: [],
      hasta_fecha: [],
      desde_letra: [],
      hasta_letra: [],
      observacion: []
    });

    this._usuarioService.cargarEmpresas()
        .subscribe( (resp:any) => {
          this.empresas = resp.listaodempresas
    });
    
    this._estadoService.obtenerEstadosCaja()
        .subscribe( (resp:any) => {
          this.estados = resp.estados
    });

    this._tipoCajaService.obtenerTiposCaja()
        .subscribe( (resp:any) => {
          this.tiposcaja = resp.tiposCaja
    });

    this._depositoService.obtenerEstantes()
          .subscribe( (resp:any) => {
            this.depositos = resp.Estantes;
    });
    
  }

  cargarTipoCaja( id: string){
    this.tipo_caja = id;
    if(this.tipo_caja == '1fxfv72gcjr711f9h'){
      this.contenidoArray = [];
      this.contenidoVistaArray = [];
    }
  }

  eliminarContenido( index ){
    this.contenidoArray.splice(index, 1);
    this.contenidoVistaArray.splice(index, 1);
  }

  mostrarForma(){
    
    from(this.areasytipos)
        .pipe(
        map(ayt => ayt),
        filter(ayt => ayt.id_tipo == this.contenido.value.id_tipo),
        map(ayt => ayt)
        )
        .subscribe(val => {
          this.nombre_area = val.nombre_area;
          this.nombre_tipo = val.nombre_tipo;
        });
    
    if ( this.contenido.valid ) {

      const contenido = new Contenido (
        this.contenido.value.id_area,
        this.contenido.value.id_tipo,
        this.contenido.value.desde_n,
        this.contenido.value.hasta_n,
        this.contenido.value.desde_fecha,
        this.contenido.value.hasta_fecha,
        this.contenido.value.desde_letra,
        this.contenido.value.hasta_letra,
        this.contenido.value.observacion
        );

      const contenido_vista = new Contenido_vista (
        this.contenido.value.id_area,
        this.contenido.value.id_tipo,
        this.nombre_area,
        this.nombre_tipo,
        this.contenido.value.desde_n,
        this.contenido.value.hasta_n,
        this.contenido.value.desde_fecha,
        this.contenido.value.hasta_fecha,
        this.contenido.value.desde_letra,
        this.contenido.value.hasta_letra,
        this.contenido.value.observacion
        );
        
      this.contenidoArray.push(contenido);
      this.contenidoVistaArray.push(contenido_vista);

      console.log(this.contenidoVistaArray);

      this.contenido.reset();
      this.contenido.markAsPristine();
      this.contenido.markAsUntouched();
      return;
    }
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

  cambioPosicion( posicion: number ){

    this.posicionSeleccionado = posicion;
    this.lugarBuscado = '';
    this.lugares = [];

    from(this.depositos)
        .pipe(
        filter(depo => depo.deposito == this.depositoSeleccionado && depo.nombre == this.estanteSeleccionado && depo.posicion == this.posicionSeleccionado ),
        map( depo => depo )
        )
        .subscribe( (val) => { 
          this.lugarBuscado = val._id;
        });

    this._depositoService.obtenerLugaresVacios( this.lugarBuscado )
          .subscribe( (resp:any) => {
            this.lugares = resp.lugares;
    });
    
  }

  cargarSecciones( id: string ){

    this.areasytipos = [];
    this.areasola = []; 
    this.tiposolo = [];
    this.temp = [];
    this.tipoSoloSelected = [];

    this._seccionesService.obtenerAreas( id )
          .subscribe( (resp:any) => {

            for (let each in resp.area) {
                this.areasytipos.push(resp.area[each]);    
            }

            for (let cada in this.areasytipos) {
              
              if( this.temp.indexOf(this.areasytipos[cada].nombre_area) === -1){

                this.temp.push(this.areasytipos[cada].nombre_area);

                const area = new Area (
                  this.areasytipos[cada].nombre_area,
                  null,
                  this.areasytipos[cada].id_area
                );
                
                this.areasola.push(area);
              }
            }

            for (let tipos in this.areasytipos) {
              const tipo = new TipoDocumento (
                this.areasytipos[tipos].nombre_tipo,
                this.areasytipos[tipos].id_area,
                this.areasytipos[tipos].id_tipo,
              );
              this.tiposolo.push(tipo);
            }

          });

  }

  cargarTipos( id: string ){
    
    this.tipoSoloSelected = [];

    from(this.tiposolo)
      .pipe(
      filter(tipo => tipo.id_area == id),
      )
      .subscribe(val => {
        this.tipoSoloSelected.push(val)
      });

  }

  existeCodigo( control: FormControl, service: EtiquetaService ): Promise<any>|Observable<any> {
    let promesa = new Promise(
      ( resolve, rejected ) => {
 
          this._etiquetaService.obtenerEtiqueta( control.value ).subscribe( response => {
            if( response === undefined ){
              resolve( null );
            }else{
              resolve( { existe: true } );
            }
          });
 
      }
    )
      
      return promesa
  }

  existeCodigo2( control: FormControl, service: EtiquetaService ): Promise<any>|Observable<any> {
    let promesa = new Promise(
      ( resolve, rejected ) => {
 
          this._etiquetaService.obtenerEtiqueta( control.value ).subscribe( response => {
            if( response === undefined ){
              resolve( null );
            }else{
              resolve( { existe: true } );
            }
          });
 
      }
    )
      
      return promesa
  }

  submitForm(){

    console.log(this.forma)
  
    if ( this.forma.invalid ) {
      return;
    }

    this.registrar = [];
  
    const cajita = new Caja(
      this.forma.value.id_codigo,
      this.forma.value.id_tipocaja,
      this.forma.value.id_empresa,
      this.forma.value.id_estado,
      this.forma.value.id_posicion
    );
  
    this.registrar.push(this.contenidoArray);
    this.registrar.unshift(cajita);
  
    console.log(this.registrar);

    this._cajaService.agregarCaja( this.registrar )
            .subscribe( resp => {
              console.log( resp );
            });

    this.contenido.reset();
    this.contenidoArray = [];
    this.contenidoVistaArray = [];
    this.forma.reset();
    this.tipo_caja = "";
    this.forma.markAsPristine();
    this.forma.markAsUntouched();
  }

}

