import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  constructor(
    public http: HttpClient
  ) { }

  crearArea( formulario: any ) {

    const URL = URL_SERVICIOS + '/secciones';

    return this.http.post( URL , formulario );

  }

  obtenerAreas( id: string ) {

    const url = URL_SERVICIOS + '/secciones/' + id; 
    
    return this.http.get( url );

  }

}
