import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  rows: number = 6;
  columns: number = 7;
  // Inicializa 'board' directamente en la declaración.
  board: (string | null)[][] = Array.from({ length: this.rows }, () =>
    Array.from({ length: this.columns }, () => null)
  );

  constructor() {
    // No es necesario inicializar 'board' en el constructor ahora.
  }

  placeToken(columnIndex: number, playerToken: string): void {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[row][columnIndex] === null) {
        this.board[row][columnIndex] = playerToken;
        break;
      }
    }
  }


  // Supongamos que esta función será llamada por el componente padre que gestiona el estado del juego.
  onMoveReceived(columnIndex: number, playerToken: string): void {
    this.placeToken(columnIndex, playerToken);
  }
}
