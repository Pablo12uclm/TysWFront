import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
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

  register() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      const email = this.registerForm.get('email')?.value ?? '';
      const username = this.registerForm.get('username')?.value ?? '';
      const password = this.registerForm.get('password')?.value ?? '';

      this.userService.register({ email, username, password }).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.successMessage = response.message;
          this.errorMessage = null;
          this.registerForm.reset();
          this.router.navigate(['/login']); // Redirigir a la página de login después del registro
        },
        error => {
          console.error('Error registering user', error);
          this.errorMessage = error.error.message || 'An error occurred';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Form is invalid or passwords do not match';
    }
  }

  passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }
}
