import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: string[][] = [];
  currentPlayer: string = 'Player1'; // Puedes cambiar la lógica para manejar los jugadores correctamente
  message: string = '';
  gameOver: boolean = false;
  endMessage: string = '';

  constructor(
    private websocketService: WebsocketService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.websocketService.connect();

    this.websocketService.messages.subscribe((message) => {
      console.log('Received a message from the server: ', message);
      this.handleMessage(message);
    });

    this.startGame();
  }

  startGame(): void {
    this.gameService.startGame().subscribe((response) => {
      console.log('Game started: ', response);
      this.board = Array.from({ length: 6 }, () => Array(7).fill(null));
      this.message = 'Game started. Player1 begins!';
      this.gameOver = false;
      this.endMessage = '';
    });
  }

  handleColumnClick(col: number): void {
    if (this.gameOver) return;

    // Encontrar la fila más baja disponible en la columna seleccionada
    for (let row = 0; row < this.board.length; row++) {
      if (this.board[row][col] === null) {
        this.sendMove(row, col);
        break;
      }
    }
  }

  sendMove(row: number, col: number): void {
    if (this.gameOver) return;

    console.log(`Attempting to send move: (${row}, ${col}) by ${this.currentPlayer}`);
    if (this.board[row][col] !== null) {
      this.message = 'Invalid move!';
      return;
    }

    this.gameService.makeMove(row, col, this.currentPlayer).subscribe((response) => {
      console.log('Move made: ', response);
      if (response.status === 'continue' || response.status === 'tie' || response.status === 'win') {
        this.board[row][col] = this.currentPlayer; // Actualizar el estado del tablero localmente
      }
      this.handleMessage(response); // Llamar a handleMessage independientemente del estado
    });
  }

  handleMessage(message: any): void {
    console.log('Handling message: ', message);
    if (!message || !message.status) {
      console.error('Error parsing message content: ', message);
      return;
    }

    if (message.status === 'win') {
      this.message = `${message.player} wins!`;
      this.endMessage = `${message.player === this.currentPlayer ? '¡Felicidades, has ganado!' : 'Lo sentimos, has perdido.'}`;
      this.gameOver = true;
    } else if (message.status === 'tie') {
      this.message = 'It\'s a tie!';
      this.endMessage = '¡Casi, has empatado!';
      this.gameOver = true;
    } else if (message.status === 'continue') {
      if (message.content) {
        try {
          const move = JSON.parse(message.content);
          console.log('Processed move: ', move);
          this.board[move.rowNum][move.col] = move.player;
          this.currentPlayer = this.currentPlayer === 'Player1' ? 'Player2' : 'Player1';
          this.message = `${this.currentPlayer}'s turn`;
        } catch (error) {
          console.error('Error parsing move content: ', message.content, error);
        }
      } else {
        this.message = `${this.currentPlayer}'s turn`;
        console.warn('Message content is undefined for status continue: ', message);
      }
    } else if (message.status === 'invalid') {
      this.message = 'Invalid move!';
    } else {
      console.error('Unexpected message status: ', message.status);
    }
  }

  backToGames(): void {
    this.router.navigate(['/games']);
  }
}
