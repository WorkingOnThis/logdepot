import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';
import { ModalGenericoService } from '../../../components/modal-generico/modal-generico.service';


@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styles: []
})
export class AgregarUsuarioComponent implements OnInit {

  forma: FormGroup ;

  empresas: any[] = [];

  mensaje: string = '';

  constructor(
    public _usuarioService: UsuarioService,
    public _modalGenericoService: ModalGenericoService
  ) { }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      apellido: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      empresa: new FormControl( null, Validators.required ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      role: new FormControl( null, Validators.required ),
    }, { validators: this.sonIguales( 'password', 'password2' ) });

    this.cargarEmpresas();

  }

  cargarEmpresas() {

    this._usuarioService.cargarEmpresas()
              .subscribe( (resp: any) => {

                this.empresas = resp.listaodempresas;
              });
  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      console.log(this.forma);
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.correo,
      this.forma.value.empresa,
      this.forma.value.password,
      this.forma.value.role      
    );

    this._usuarioService.crearUsuario( usuario )
            .subscribe( resp => {
              this.mensaje = 'Usuario creado con exito';
              this._modalGenericoService.mostrarModal( this.mensaje );
              console.log( resp );
            });
  }

}
