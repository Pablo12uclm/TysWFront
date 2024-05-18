import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private apiUrl = 'http://localhost:8080/api/games';

  constructor(private http: HttpClient) {}

  playMatch(gameName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/play?gameName=${gameName}`, {
      withCredentials: true,
      observe: 'response'
    });
  }
}
