import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private loginUrl = 'https://0df1-85-159-26-4.ngrok-free.app/api/login';
  private getUrl = 'https://0df1-85-159-26-4.ngrok-free.app/api/SuperHero';

  constructor(private http: HttpClient){}

  login(credentials: {Login: string, password: string}): Observable <any>{
    return this.http.post(this.loginUrl, credentials);
  } 

  getValue(){
    const headers = {
      'Authorization': `Bearer ${this.getToken()}`,
      'Accept': 'application/json'
    };
    return this.http.get(this.getUrl, {headers, responseType: 'json'});
  }

  saveToken(token: string) : void{
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null{
    return localStorage.getItem('authToken');
  }
}
