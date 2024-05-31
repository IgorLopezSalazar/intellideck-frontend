export class User {
  private name: string;
  private surname: string;
  private username: string;
  private email: string;
  private password: string;
  private profilePicture?: string;
  private role: string;

  constructor(name: string, surname: string, email: string, username: string, password: string, role: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  toJson(): string {
    return JSON.stringify({
      name: this.name,
      surname: this.surname,
      email: this.email,
      username: this.username,
      password: this.password
    });
  }
}
