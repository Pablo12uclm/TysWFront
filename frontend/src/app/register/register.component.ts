import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  register() {
    if (this.registerForm.valid) {
      const { username, email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      const user = { username, email, password };
      this.userService.register(user).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.successMessage = response.message;
          this.errorMessage = null;
          this.registerForm.reset();
        },
        error => {
          console.error('Error registering user', error);
          this.errorMessage = error.error.message || 'An error occurred';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Form is invalid';
    }
  }
}