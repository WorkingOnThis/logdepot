import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from '../../../models/empresa.model';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styles: []
})
export class ActualizarUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '', '', '');
  empresas: Empresa[] = [];

  constructor(
    public _usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.params.subscribe( params => {

      let id = params['id'];
      this.cargarUsuario( id );

    });
  }

  cargarUsuario( id: string ) {
    this._usuarioService.cargarUsuario( id )
          .subscribe( resp => this.usuario = resp );
  }

  ngOnInit() {

    this._usuarioService.cargarEmpresas()
            .subscribe( (resp:any) => {
              this.empresas = resp.listaodempresas
            });
  }

  guardar( value: any){
    console.log('modificar', value);
  }

}
