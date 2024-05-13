import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  startGame(): Observable<any> {
      return this.http.post(`${this.apiUrl}/start`, {});
  }

  makeMove(position: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/move`, { position });
  }
}
