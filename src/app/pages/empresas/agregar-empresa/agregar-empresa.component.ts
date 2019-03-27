import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpresaService } from '../../../services/service.index';
import { Empresa } from '../../../models/empresa.model';
import { ModalGenericoService } from 'src/app/components/modal-generico/modal-generico.service';

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styles: []
})
export class AgregarEmpresaComponent implements OnInit {

  forma: FormGroup ;

  mensaje: string = '';

  constructor(
    public _empresaService: EmpresaService,
    public _modalGenericoService: ModalGenericoService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required )
      });

  }

  registrarEmpresa() {

    if ( this.forma.invalid ) {
      return;
    }

    const empresa = new Empresa(
      this.forma.value.nombre
    );

    this._empresaService.crearEmpresa( empresa )
            .subscribe( resp => {
              this.mensaje = 'Empresa agregada: ' + this.forma.value.nombre ;
              this._modalGenericoService.mostrarModal( this.mensaje );
              console.log( resp );
            });
  }

}