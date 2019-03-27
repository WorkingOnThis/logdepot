import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(
    public http: HttpClient
  ) { }

  agregarCaja( formulario: any ) {

    const URL = URL_SERVICIOS + '/caja';

    return this.http.post( URL , formulario );

  }

  obtenerCaja( id: string ) {

    const url = URL_SERVICIOS + '/caja/' + id; 
    
    return this.http.get( url );

  }

  obtenerCajaParaModal( id: string ) {

    const url = URL_SERVICIOS + '/caja/modaldeposito/' + id; 
    
    return this.http.get( url );

  }
  

  cargarCajas(){

    const url = URL_SERVICIOS + '/caja'; 
    
    return this.http.get( url );

  }


}
