import { BehaviorSubject } from 'rxjs';
import { users } from '../components/users/data';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RaciaService{
  private newArrSubject = new BehaviorSubject<User[]>([]);
  newArr$ = this.newArrSubject.asObservable(); 
  constructor(private http: HttpClient) { 
    this.newArrSubject.next(users);
  }
  get(){
    return this.http.get("https://jsonplaceholder.org/posts");
  }
  setRacia(newVal: User[]){
    this.newArrSubject.next(newVal);
  }
  getRacia(): User[] {
    return this.newArrSubject.getValue();
  }
}
interface User {
  id: number;
  name: string;
  id_taga: number;
  id_stola: number;
  id_mesto: number;
  date: string;
  place: string;
}
