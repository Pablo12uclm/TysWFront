import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {

  constructor(private router: Router) {}

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToConnect4() {
    this.router.navigate(['/connect4']);
  }
  
  startGame(game: string) {
    console.log(`${game} game selected`);
    // Implement game start logic here
  }
}
