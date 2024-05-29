import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT } from '../utils/url';
import { HttpHeaders } from '@angular/common/http';

export interface NewUser {
  username: string;
  first_name: string;
  last_name: string;
  nro_documento: string;
  telefono: string;
  email: string;
  password: string;
}

export interface User {
  id?: number;
  username: string;
  email?: string;
  password?: string;
}

export interface UserResponse {
  user: User;
  token: string;
  is_staff: any;
}

export interface LogoutResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(ENDPOINT + 'login/', user);
  }

  public register(user: NewUser): Observable<UserResponse> {
    return this.http.post<UserResponse>(ENDPOINT + 'register/', user);
  }

  public logout(): Observable<LogoutResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post<LogoutResponse>(
      ENDPOINT + 'logout/',
      {},
      { headers }
    );
  }

  public clearToken(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAdmin');
  }
}
