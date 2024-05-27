import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  marca: string;
  modelo: string
  imagen: string;
  precio: number;
  color: string
  detalle: string;
  estilo: string
  material: string
  rodado: string
  stock: number
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  ENDPOINT = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ENDPOINT);
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.ENDPOINT + 'products/' + id);
  }
}
