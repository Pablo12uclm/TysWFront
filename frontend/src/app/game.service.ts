import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080/api/connect4'; // Alineado con la configuración del backend

  constructor(private http: HttpClient) { }

  startGame(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/start`, {});
  }

  makeMove(row: number, col: number, player: string): Observable<any> {
    const params = new HttpParams()
      .set('row', row.toString())
      .set('col', col.toString())
      .set('player', player);
    return this.http.post<any>(`${this.baseUrl}/move`, {}, { params });
  }
}
