import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';

import { URL_BACKEND } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = URL_BACKEND + '/api/facturas';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filtrarProductos(term: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndPoint, factura);
  }
  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.urlEndPoint);
  }
  
}
