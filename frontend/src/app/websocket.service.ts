import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const WS_ENDPOINT = 'ws://localhost:8080/ws';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;  // Definite assignment assertion

  public messages: Subject<any> = new Subject();

  constructor() {
    this.connect();
  }

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(WS_ENDPOINT);
      this.socket$.subscribe(
        (message) => this.messages.next(message),
        (err) => console.error(err),
        () => console.warn('Completed!')
      );
    }
  }

  public sendMessage(msg: any): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.next(msg);
    }
  }

  public close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
