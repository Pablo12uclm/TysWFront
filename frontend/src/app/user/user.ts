export class User {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
  
    constructor(nombre: string, email: string, password: string, confirmPassword: string) {
      this.nombre = nombre;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
    }
  

    /*passwordsMatch(): boolean {
      return this.password === this.confirmPassword;
    }*/

    login(email:string, password:string) {
      this.email = email
      this.password = password
    }

  }
  