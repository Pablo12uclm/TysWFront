// src/app/connect4.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user/user'; // Asegúrate de que la ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class Connect4Service {
  private apiUrl = 'http://localhost:8080/api/connect4';

  constructor(private http: HttpClient) {}

  joinGame(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/join`, user);
  }

  startGame(): Observable<any> {
    return this.http.post(`${this.apiUrl}/start`, {});
  }

  makeMove(row: number, col: number, player: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/move`, { row, col, player });
  }
}
