import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT } from '../utils/url';

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
  email: string;
  password?: string;
}
export interface UserResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(ENDPOINT + 'login/', user);
  }

  public register(user: NewUser): Observable<any> {
    return this.http.post<any>(ENDPOINT + 'register/', user);
  }
}
