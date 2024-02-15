import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://10.2.0.120:8080/api/Radios/';
  private EmployeUrl = 'http://10.2.0.120:8080/api/Employees/Get';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.EmployeUrl);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Get');
  }

  addData(data: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + 'Add', data);
  }

  editData(data: any): Observable<any[]> {
    return this.http.put<any>(this.apiUrl + 'Edit', data);
  }

  deleteData(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl + `Delete/${id}`);
  }
}
