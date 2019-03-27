import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Lote } from '../../../models/lote.model';
import { Etiqueta } from '../../../models/etiqueta.model';
import { LoteService } from '../../../services/service.index';

import swal from 'sweetalert2';

import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-etiquetas-caja',
  templateUrl: './etiquetas-caja.component.html',
  styles: []
})
export class EtiquetasCajaComponent implements OnInit {

  barra: boolean = true;
  
  forma: FormGroup;
  matriz: Array<any> = [];

  etiquetas_vista: Etiqueta[] = [];

  loteSeleccionado: string;
  cantidadSeleccionada: number;

  defaulTipo: string = "barras";

  lotes: Array<Lote> = [];

  constructor(
    public _fb: FormBuilder,
    public _loteService: LoteService
  ) { }

  ngOnInit() {
    this.forma = this._fb.group({
      cantidad: new FormControl ( '', (Validators.compose( [ Validators.required, Validators.min(1), Validators.max(20) ]))),
    });

    this.cargarLotes();

  }
  
  cargarLotes(){    
    this._loteService.infolote()
      .subscribe( (resp:any) => {
         this.lotes = resp.lote;
         this.loteSeleccionado = this.lotes[0]._id;
         this.cantidadSeleccionada = this.lotes[0].cantidad;
        //  this.etiquetas_vista = [];
         this.lotebyid( this.lotes[0]._id );
      });
  }

  lotebyid( id: string ){
    this._loteService.lotebyid( id )
    .subscribe( (resp:any) => {
      this.etiquetas_vista = resp.lote;
    });
  }

  cambioLote( id: string ){
    
    this.cantidadSeleccionada = 0;

    from(this.lotes)
        .pipe(
        filter(depo => depo._id == id)
        )
        .subscribe(val => {
          this.cantidadSeleccionada = val.cantidad;
          this.lotebyid( id );
        });
  }

  cambioTipo( valor: string ){
    
    if( valor == "barras"){
      this.barra = true;
      return
    }

    if( valor == "qr" ){
      this.barra = false;
      return
    }
  }

  ultimolote(){
    this._loteService.ultimolote()
      .subscribe( (resp:any) => {
        //  this.etiquetas_vista = [];
         this.etiquetas_vista = resp.lote;
         console.log(this.etiquetas_vista);
      });
  };


  submitForma(){

      if ( this.forma.invalid ) {
        console.log(this.forma);
        return;
      }
  
      this.matriz = []
  
      const lote = new Lote (
        this.forma.value.cantidad
      );
  
      for (let i=1; i <= this.forma.value.cantidad; i++) {
          let lugarcito = new Etiqueta ();
          this.matriz.push(lugarcito);
      }
      
      this.matriz.unshift(lote);

      this._loteService.crearLote( this.matriz )
              .subscribe( resp => { 

                swal({
                  title: 'Etiquetas creadas',
                  text: 'Se han generado las etiquetas.',
                  type: 'success',
                  confirmButtonText: 'Ok'
                })

                this.forma.reset();
                this.forma.markAsPristine();
                this.forma.markAsUntouched();

                this.ultimolote();
                this.cargarLotes();

              });
  }


  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Etiquetas para cajas</title>
          <style>
            .izquierda{
              text-align: left;
              display:inline-block;
            }
            .derecha{
              text-align: left;
              display:inline-block;
            }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
