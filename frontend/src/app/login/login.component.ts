import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentUser: any = null;

  constructor(private userService: UserService) {}

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      this.userService.login(email, password).subscribe(
        response => {
          console.log('User logged in successfully', response);
          this.successMessage = response.message;
          this.errorMessage = null;
          this.currentUser = response.data;
          this.loginForm.reset();
        },
        error => {
          console.error('Error logging in user', error);
          this.errorMessage = error.error.message || 'An error occurred';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Form is invalid';
    }
  }

  logout() {
    this.userService.logout().subscribe(
      response => {
        console.log('User logged out successfully', response);
        this.successMessage = response.message;
        this.errorMessage = null;
        this.currentUser = null;
      },
      error => {
        console.error('Error logging out user', error);
        this.errorMessage = error.error.message || 'An error occurred';
        this.successMessage = null;
      }
    );
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.currentUser = response.data;
        console.log('Current user:', this.currentUser);
      },
      error => {
        console.error('Error getting current user', error);
        this.errorMessage = error.error.message || 'An error occurred';
        this.successMessage = null;
      }
    );
  }
}
