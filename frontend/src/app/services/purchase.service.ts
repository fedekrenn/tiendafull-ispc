import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import Cookies from 'universal-cookie';
import { ENDPOINT } from '../utils/url';
import { PurchaseResponse } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private cookies = new Cookies();

  constructor(private http: HttpClient) {}

  public getPurchases(): Observable<PurchaseResponse[]> {
    const token = this.cookies.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`)
      .set('Content-Type', 'application/json');
    return this.http.get<PurchaseResponse[]>(
      ENDPOINT + 'purchase/user_purchases/',
      {
        headers,
      }
    );
  }
}
