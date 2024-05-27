import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT } from '../utils/url';

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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
