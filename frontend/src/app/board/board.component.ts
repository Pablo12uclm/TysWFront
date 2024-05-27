import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: string[][] = [];
  currentPlayer: string = 'X';
  message: string = '';

  constructor(private gamesService: GamesService, private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.startGame();
    this.websocketService.getMessages().subscribe(move => {
      const { row, col, player } = move;
      this.board[row][col] = player;
    });
  }

  startGame(): void {
    this.gamesService.startGame().subscribe(response => {
      this.board = Array(6).fill(null).map(() => Array(7).fill(null));
      this.message = response;
    });
  }

  makeMove(row: number, col: number): void {
    if (!this.board[row][col]) {
      this.gamesService.makeMove(row, col, this.currentPlayer).subscribe(response => {
        this.message = response;
        this.websocketService.sendMessage({ row, col, player: this.currentPlayer });
        if (response.includes('wins') || response.includes('tie')) {
          this.resetGame();
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
      });
    }
  }

  placeToken(col: number, player: string): void {
    for (let row = this.board.length - 1; row >= 0; row--) {
      if (!this.board[row][col]) {
        this.makeMove(row, col);
        break;
      }
    }
  }

  resetGame(): void {
    this.startGame();
  }
}

