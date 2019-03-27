import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Caja } from '../../../models/caja.model';
import { CajaService, EtiquetaService, UsuarioService, EstadoService, TipoCajaService, SeccionesService, DocumentoService } from '../../../services/service.index';
import { TipoDocumento } from '../../../models/tipo-documento.model';
import { Area } from '../../../models/area.model';
import { filter } from 'rxjs/operators';
import { Documento } from '../../../models/documento.model';
import { Contenido } from 'src/app/models/contenido.model';


@Component({
  selector: 'app-agregar-documentos',
  templateUrl: './agregar-documentos.component.html',
  styles: []
})
export class AgregarDocumentosComponent implements OnInit {

  id: string;

  forma: FormGroup ;
  contenido: FormGroup ;

  caja: Caja = new Caja('', '', '', '', '', '', '','');

  solicitantes: Array<any> = [];

  areasytipos: any[] = [];
  areasola: Array<Area> = [];
  temp: any[] = [];
  tiposolo: Array<TipoDocumento> = [];
  tipoSoloSelected: Array<TipoDocumento> = [];

  registrar: Array<any> = [];

  constructor(
    public _fb: FormBuilder,
    public _etiquetaService: EtiquetaService,
    public activatedRoute: ActivatedRoute,
    public _cajaService: CajaService,
    public _usuarioService: UsuarioService,
    public _estadoService: EstadoService,
    public _tipoCajaService: TipoCajaService,
    public _seccionesService: SeccionesService,
    public _documentoService: DocumentoService
  ) { 

    activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    });

  }
  
  ngOnInit() {
    
    
    this.forma = this._fb.group({
      id_codigo: new FormControl ( '', Validators.required, [this.existeCodigo.bind( this ), this.existeCodigo2.bind(this)]),
      id_solicitante: new FormControl ( '', Validators.required),
      estado: []
    });
    
    this.contenido = this._fb.group({
      id_area: new FormControl( '', Validators.required ),
      id_tipo: new FormControl( '', Validators.required ),
      desde_n: [],
      desde_fecha: [],
      desde_letra: [],
      observacion: []
    });
    
    this._cajaService.obtenerCaja( this.id )
          .subscribe( (resp:any) => {
              this.caja = resp.caja;

              this.areasytipos = [];
              this.areasola = []; 
              this.tiposolo = [];
              this.temp = [];
              this.tipoSoloSelected = [];

              this._seccionesService.obtenerAreas( this.caja.id_empresa )
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

              this._usuarioService.usuariosPorEmpresa( this.caja.id_empresa )
                  .subscribe( (resp:any) => {
                    this.solicitantes = resp.usuario;
              });
    });

    

    // this._estadoService.obtenerEstadosCaja()
    //     .subscribe( (resp:any) => {
    //       this.estados = resp.estados
    // });

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
  
    const documento = new Documento(
      this.caja._id,
      this.forma.value.id_codigo,
      this.forma.value.id_solicitante,
      '1fxfv71nkjrpus6ai'
    );

    const seccion = new Contenido (
      this.contenido.value.id_area,
      this.contenido.value.id_tipo,
      this.contenido.value.desde_n,
      null,
      this.contenido.value.desde_fecha,
      null,
      this.contenido.value.observacion
      );
  
    this.registrar.push(seccion);
    this.registrar.unshift(documento);
  
    console.log(this.registrar);

    this._documentoService.crearDocumento( this.registrar )
            .subscribe( resp => {
              console.log( resp );
              this.contenido.reset();
              this.forma.reset();
              this.forma.markAsPristine();
              this.forma.markAsUntouched();
            });

  }
  
}
