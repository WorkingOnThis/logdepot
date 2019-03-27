import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(
    public http: HttpClient
  ) { }

  crearLote( formulario: any ) {
    
    const URL = URL_SERVICIOS + '/lote';

    return this.http.post( URL , formulario );
    
  }

  ultimolote( ) {
    
    let url = URL_SERVICIOS + '/lote/'; 
    
    return this.http.get( url );
    
  }

  infolote( ) {
    
    let url = URL_SERVICIOS + '/lote/infolote'; 
    
    return this.http.get( url );
    
  }

  lotebyid( id: string ) {
    
    let url = URL_SERVICIOS + '/lote/' + id; 
    
    return this.http.get( url );
    
  }

}
