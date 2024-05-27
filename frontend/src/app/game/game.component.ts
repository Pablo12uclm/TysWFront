import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: string[][] = Array.from({ length: 6 }, () => Array(7).fill(null));
  currentPlayer: string = 'R';

  constructor(private gameService: GamesService, private websocketService: WebsocketService) { }

  ngOnInit() {
    // Conectar WebSocket para recibir actualizaciones del servidor
    this.websocketService.getMessages().subscribe(msg => {
      console.log('Response from websocket: ', msg);
      switch (msg.status) {
        case 'win':
          alert(`Player ${msg.player} wins!`);
          break;
        case 'tie':
          alert('The game is a tie!');
          break;
        case 'invalid':
          alert('Invalid move!');
          break;
        case 'continue':
          this.updateBoard(msg.move);
          break;
        default:
          break;
      }
    });

    // Iniciar el juego
    this.gameService.startGame().subscribe(response => {
      console.log(response);
    });
  }

  sendMove(row: number, col: number) {
    const move = { row, col, player: this.currentPlayer };
    this.gameService.makeMove(row, col, this.currentPlayer).subscribe(response => {
      console.log(response);
      // Cambiar de jugador después de un movimiento válido
      this.currentPlayer = this.currentPlayer === 'R' ? 'Y' : 'R';
    });
  }

  updateBoard(move: any) {
    this.board[move.row][move.col] = move.player;
  }
}


