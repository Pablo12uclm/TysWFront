// src/app/game/game.component.ts
import { Component, OnInit } from '@angular/core';
import { Connect4Service } from '../connect4.service';
import { UserService } from '../user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: string[][] = [];
  currentPlayer: string = 'player1';
  message: string = '';
  currentUser?: User;

  constructor(private connect4Service: Connect4Service, private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
        console.log('Current user:', this.currentUser);

        this.connect4Service.startGame().subscribe(
          response => {
            this.message = response.message;
          },
          error => {
            console.error('Error starting game:', error);
          }
        );

        if (this.currentUser) {
          this.connect4Service.joinGame(this.currentUser).subscribe(
            response => {
              this.message = 'Game started! Player 1 vs Player 2';
            },
            error => {
              if (error.error.message === 'Waiting for another player to join.') {
                this.message = 'Waiting for another player to join...';
              } else {
                console.error('Error joining game:', error);
              }
            }
          );
        }
      },
      error => {
        console.error('Error getting current user:', error);
      }
    );
  }

  makeMove(row: number, col: number) {
    this.connect4Service.makeMove(row, col, this.currentPlayer).subscribe(
      response => {
        this.board = response.board;
        if (response.status === 'win') {
          this.message = `${this.currentPlayer} wins!`;
        } else if (response.status === 'tie') {
          this.message = 'It\'s a tie!';
        } else {
          this.currentPlayer = this.currentPlayer === 'player1' ? 'player2' : 'player1';
        }
      },
      error => {
        console.error('Error making move:', error);
      }
    );
  }
}
