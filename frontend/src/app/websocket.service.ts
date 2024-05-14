import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocketSubject<any>;
  public messages$!: Observable<any>;

  constructor() {
    this.connect();
  }

  public connect(): void {
    if (!this.socket || this.socket.closed) {
      this.socket = webSocket({
        url: 'ws://localhost:8080/ws',
        deserializer: (e: MessageEvent) => JSON.parse(e.data) // Parse JSON
      });

      this.messages$ = this.socket.pipe(
        share()
      );

      this.socket.subscribe(
        msg => console.log('message received: ', msg), // Log messages received
        err => console.error('error: ', err), // Log errors
        () => console.log('complete') // Log completion
      );
    }
  }

  public sendMessage(msg: any): void {
    this.socket.next(msg);
  }
}
