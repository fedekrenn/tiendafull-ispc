import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ENDPOINT } from '../utils/url';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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
  is_staff?: boolean;
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
  public isLogged = new BehaviorSubject<boolean>(false);
  public isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(ENDPOINT + 'login/', user).pipe(
      tap(() => {
        this.isLogged.next(true);
        if (user.is_staff !== undefined) {
          this.isAdmin.next(user.is_staff);
        }
      })
    );
  }

  public register(user: NewUser): Observable<UserResponse> {
    return this.http.post<UserResponse>(ENDPOINT + 'register/', user);
  }

  public logout(): Observable<LogoutResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http
      .post<LogoutResponse>(ENDPOINT + 'logout/', {}, { headers })
      .pipe(
        tap(() => {
          this.isLogged.next(false);
          this.isAdmin.next(false);
        })
      );
  }

  public clearToken(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAdmin');
  }
}
