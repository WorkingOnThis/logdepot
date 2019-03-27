import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(
    public http: HttpClient
  ) { }

  crearDocumento( formulario: any ) {

    const URL = URL_SERVICIOS + '/documento';

    return this.http.post( URL , formulario );

  }

  obtenerDocumento( id: string ) {

    const url = URL_SERVICIOS + '/documento/' + id; 
    
    return this.http.get( url );

  }

  cargarDocumentos(){

    const url = URL_SERVICIOS + '/documento'; 
    
    return this.http.get( url );

  }


}