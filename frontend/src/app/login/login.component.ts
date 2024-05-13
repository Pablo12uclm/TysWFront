import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  loginValido: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.userService.loginUsuario({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.loginValido = true;
        },
        error: (error) => {
          console.error('Error iniciando sesión', error);
        }
      });
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onInvitado() {
    this.router.navigate(['/board']);
  }
}
