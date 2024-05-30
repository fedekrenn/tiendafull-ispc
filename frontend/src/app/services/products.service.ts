import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT } from '../utils/url';
import { HttpHeaders } from '@angular/common/http';

export interface Product {
  id?: number;
  marca: string;
  modelo: string;
  imagen?: string;
  precio: number;
  color: string;
  detalle?: string;
  estilo: string;
  material: string;
  rodado: string;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ENDPOINT + 'products');
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(ENDPOINT + 'products/' + id);
  }

  public postProducts(product: Product): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.post(ENDPOINT + 'products/', product, { headers });
  }
}
