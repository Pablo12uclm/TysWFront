import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    // Puedes llamar a connectWebSocket aquí para iniciar la conexión al cargar el componente
    this.connectWebSocket();
  }

  connectWebSocket(): void {
    this.webSocketService.sendMessage({ message: "Hello Server!" });
  }
}
