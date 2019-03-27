import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  constructor(
    public http: HttpClient
  ) { }

  obtenerEtiqueta( id: string) {
    
    let url = URL_SERVICIOS + '/etiqueta/' + id; 
    
    return this.http.get( url ).pipe(
                    map( (resp:any) => resp.etiqueta ));

  }
}
