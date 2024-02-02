import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private loginUrl = 'https://c91f-212-96-76-201.ngrok-free.app/api/login';

  constructor(private http: HttpClient){}

  login(credentials: {Login: string, password: string}): Observable <any>{
    return this.http.post(this.loginUrl, credentials);
  }

  saveToken(token: string) : void{
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null{
    return localStorage.getItem('authToken');
  }
}
