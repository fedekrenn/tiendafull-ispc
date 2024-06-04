import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT } from '../utils/url';
import { HttpHeaders } from '@angular/common/http';
import type { Product } from '../types/types';
import Cookies from 'universal-cookie';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private cookies = new Cookies();

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ENDPOINT + 'products');
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(ENDPOINT + 'products/' + id);
  }

  public postProducts(product: Product): Observable<any> {
    const token = this.cookies.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.post(ENDPOINT + 'products/', product, { headers });
  }
}
