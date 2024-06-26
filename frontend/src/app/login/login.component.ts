import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      user => {
        if (user) {
          this.router.navigate(['/games']);
        }
      },
      error => {
        if (error.status === 401) {
          // Ignorar el error 401
          console.log('No user is currently authenticated.');
        } else {
          console.error('Error getting current user:', error);
        }
      }
    );
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      this.userService.login(email, password).subscribe(
        response => {
          console.log('User logged in successfully', response);
          this.successMessage = response.message;
          this.errorMessage = null;
          this.loginForm.reset();
          this.router.navigate(['/games']); // Redirigir a la página de juegos después del login
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
}
