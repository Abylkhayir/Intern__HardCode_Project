import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://10.2.0.120:8080/api/Users/Login';

  constructor(private http: HttpClient) {}

  authenticate(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { login, password });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN);
    return !!token;
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  logout(): void {
    localStorage.removeItem(TOKEN);
  }
}
