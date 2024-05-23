import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  ENDPOINT = 'https://fedekrenn-aquacat.web.val.run/';

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ENDPOINT + 'products');
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.ENDPOINT + 'products/' + id);
  }
}
