import { Component, OnInit } from '@angular/core';
import { Caja } from '../../../models/caja.model';
import { CajaService } from '../../../services/service.index';

@Component({
  selector: 'app-listar-cajas',
  templateUrl: './listar-cajas.component.html',
  styles: []
})
export class ListarCajasComponent implements OnInit {

  dtOptions: any = {};
  
  cajas: Caja[] = [];

  cargando: boolean = true;

  constructor(
    public _cajaService: CajaService
  ) { }

  ngOnInit() {

    $.fn.dataTable.ext.errMode = 'throw';

    this.dtOptions = {
      // ajax: 'data/data.json',

      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        { extend: 'copy', text: 'Copiar' },
        { extend: 'print', text: 'Imprimir' },
        { extend: 'excel', text: 'Excel' }
      ],
    
      pagingType: 'full_numbers',
      responsive: true,
       // Declare the use of the extension in the dom parameter
      /* below is the relevant part, e.g. translated to spanish */ 
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };

    this.cargarCajas();

    // this._modalUploadService.notificacion
    //       .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    // this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarCajas() {
    
    this.cargando = true;

    this._cajaService.cargarCajas()
              .subscribe( (resp: any) => {
                this.cajas = resp.cajas;
                console.log(this.cajas);
                this.cargando = false;
              });
  }

  verdadero(){
    return true;
  }

  borrarUsuario( usuario: string ) {

    // if ( usuario._id === this._usuarioService.usuario._id){
    //   this.mensaje = 'No se puede borrar a si mismo.';
    //   this._modalGenericoService.mostrarModal( this.mensaje );
    //   return;
    // } 

    // swal({
    //   text: '\n Esta a punto de borrar a ' + usuario.nombre + ' ' + usuario.apellido + '\n\n',
    //   buttons: true,
    //   dangerMode: true,
    // })
    // .then( borrar => {

    //   if (borrar) {

    //     this._usuarioService.borrarUsuario( usuario._id )
    //               .subscribe( borrado => {
    //                   this.cargarUsuarios();
    //               });

    //   }

    // });


  }

}
