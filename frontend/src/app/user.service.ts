// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  private isAuthenticated = false;
  private currentUser?: User;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{message: string, data: User}>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(response => {
        this.isAuthenticated = true;
        this.currentUser = response.data;
      }),
      map(response => response.message)
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticated = false;
        this.currentUser = undefined;
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return new Observable(observer => {
        observer.next(this.currentUser!);
        observer.complete();
      });
    }
    return this.http.get<User>(`${this.apiUrl}/current`, { withCredentials: true }).pipe(
      tap(user => this.currentUser = user)
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
