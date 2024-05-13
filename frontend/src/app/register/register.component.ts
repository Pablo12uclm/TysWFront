import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Crear un FormGroup para el formulario de registro
  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    console.log(this.registerForm.value)
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      const newUser = new User(
        this.registerForm.value.nombre!,
        this.registerForm.value.email!,
        this.registerForm.value.password!,
        this.registerForm.value.confirmPassword!
      );

      this.userService.registrarUsuario(newUser).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error durante el registro:', error);
        }
      });
    } else {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        console.error('Las contraseñas no coinciden');
      }
    }
  }
}
