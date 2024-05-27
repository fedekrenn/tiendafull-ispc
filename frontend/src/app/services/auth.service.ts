import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  username: string;
  email: string;
  password: string;
}
interface UserResponse {
  user: {
    id: number;
    email: string;
    username: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/login/';

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.loginUrl, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
