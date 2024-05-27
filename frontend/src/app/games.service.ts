import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private baseUrl = 'http://localhost:8080/connect4';

  constructor(private http: HttpClient) { }

  startGame(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/start`, {});
  }

  makeMove(row: number, col: number, player: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/move`, { row, col, player });
  }
}

