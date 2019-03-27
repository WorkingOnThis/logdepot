import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../models/empresa.model';
import { EmpresaService } from '../../../services/service.index';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styles: []
})
export class ListarEmpresasComponent implements OnInit {

  dtOptions: any = {};

  empresas: Empresa[] = [];

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _empresaService: EmpresaService,
    public _modalUploadService : ModalUploadService
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

    this.cargarEmpresas();

    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarEmpresas() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'empresas', id );
  }

  cargarEmpresas() {
    
    this.cargando = true;

    this._empresaService.cargarEmpresas()
              .subscribe( (resp: any) => {
                
                this.totalRegistros = resp.total;
                this.empresas = resp.empresas;
                this.cargando = false;
              });
  }


  anularEmpresa( empresa: Empresa ){

    this._empresaService.anularEmpresa( empresa )
          .subscribe( borrado => {
              this.cargarEmpresas();
          });

  }

}