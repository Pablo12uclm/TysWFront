import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
