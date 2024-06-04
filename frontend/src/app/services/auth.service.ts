import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ENDPOINT } from '../utils/url';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User, NewUser, UserResponse, LogoutResponse } from '../types/types';
import Cookies from 'universal-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookies = new Cookies();

  public isLogged = new BehaviorSubject<boolean>(this.checkIsLogged());
  public isAdmin = new BehaviorSubject<boolean>(this.checkIsAdmin());
  public userEmail = new BehaviorSubject<string>(
    this.cookies.get('userEmail') || ''
  );

  constructor(private http: HttpClient) {}

  public checkIsLogged() {
    return !!this.cookies.get('token');
  }

  public checkIsAdmin() {
    return !!this.cookies.get('isAdmin');
  }

  public login(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(ENDPOINT + 'login/', user).pipe(
      tap((response) => {
        const userEmail = response.user.email!;
        this.userEmail.next(userEmail);
        this.isLogged.next(true);
        this.cookies.set('userEmail', userEmail);
        this.cookies.set('token', response.token);
        if (response.is_staff) {
          this.isAdmin.next(response.is_staff);
          this.cookies.set('isAdmin', response.is_staff);
        }
      })
    );
  }

  public register(user: NewUser): Observable<UserResponse> {
    return this.http.post<UserResponse>(ENDPOINT + 'register/', user).pipe(
      tap((response) => {
        const userEmail = response.user.email!;
        this.userEmail.next(userEmail);
        this.isLogged.next(true);
        this.cookies.set('userEmail', userEmail);
        this.cookies.set('token', response.token);
        if (response.is_staff) {
          this.isAdmin.next(response.is_staff);
          this.cookies.set('isAdmin', response.is_staff);
        }
      })
    );
  }

  public logout(): Observable<LogoutResponse> {
    const token = this.cookies.get('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http
      .post<LogoutResponse>(ENDPOINT + 'logout/', {}, { headers })
      .pipe(
        tap(() => {
          this.isLogged.next(false);
          this.isAdmin.next(false);
          this.cookies.remove('userEmail');
          this.cookies.remove('token');
          this.cookies.remove('isAdmin');
        })
      );
  }
}
