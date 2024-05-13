import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocketSubject<any>;

  constructor() {
    this.connect();
  }

  public connect(): void {
    if (!this.socket || this.socket.closed) {
      this.socket = webSocket('ws://localhost:8080/ws');
      this.socket.subscribe(
        msg => console.log('message received: ', msg), // Log messages received
        err => console.error('error: ', err), // Log errors
        () => console.log('complete') // Log completion
      );
    }
  }

  sendMessage(msg: any): void {
    this.socket.next(msg);
  }
}

