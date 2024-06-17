export class User {
  private __id? : string;
  private _name: string;
  private _surname: string;
  private _username: string;
  private _email: string;
  private _password: string;
  private _profilePicture?: string;
  private _role: string;
  private _followedUsers: User[] = [];

  constructor(name: string, surname: string, email: string, username: string, password: string, role: string) {
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._username = username;
    this._password = password;
    this._role = role;
  }

  get _id(): string | undefined {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get profilePicture(): string | undefined {
    return this._profilePicture;
  }

  set profilePicture(value: string) {
    this._profilePicture = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get followedUsers(): User[]{
    return this._followedUsers;
  }

  set followedUsers(value: User[]) {
    this._followedUsers = value;
  }

  toJson(): string {
    return JSON.stringify({
      name: this._name,
      surname: this._surname,
      email: this._email,
      username: this._username,
      password: this._password
    });
  }
}
