import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebSocket Test';
  messages: any[] = [];

  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    this.wsService.messages$.subscribe(
      (msg: any) => {
        this.messages.push(msg);
      },
      (err: any) => console.error(err),
      () => console.log('complete')
    );
  }

  sendMessage() {
    const message = {
      type: 'chat',
      content: 'Hello from Angular!'
    };
    this.wsService.sendMessage(message);
  }
}
