import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
        console.log('Current user:', this.currentUser);
      },
      error => {
        console.error('Error getting current user', error);
        this.errorMessage = error.error.message || 'An error occurred';
        this.successMessage = null;
      }
    );
  }

  logout() {
    this.userService.logout().subscribe(
      response => {
        console.log('User logged out successfully', response);
        this.successMessage = response.message;
        this.errorMessage = null;
        this.currentUser = null;
        this.router.navigate(['/login']); // Redirigir al login después del logout
      },
      error => {
        console.error('Error logging out user', error);
        this.errorMessage = error.error.message || 'An error occurred';
        this.successMessage = null;
      }
    );
  }

  navigateToGames() {
    this.router.navigate(['/games']); // Navegar a la página de juegos
  }
}
