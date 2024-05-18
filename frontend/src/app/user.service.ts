import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(response => {
        this.isAuthenticated = true;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticated = false;
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current`, { withCredentials: true });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
