export class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public confirmPassword?: string
  ) {}
  

    /*passwordsMatch(): boolean {
      return this.password === this.confirmPassword;
    }*/

    login(email:string, password:string) {
      this.email = email
      this.password = password
    }

  }
  