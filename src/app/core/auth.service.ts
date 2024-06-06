import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private END_POINT_USERS = environment.API_URL + '/users';
  private END_POINT_LOGIN = environment.API_URL + '/login';

  constructor(private http: HttpClient) { }

  login(userCredentials: { username: string; password: string }): Observable<any> {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    };

    return this.http.post(this.END_POINT_LOGIN, userCredentials, options);
  }

  register(user: User): Observable<any> {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    };
    console.log(user.toJson());
    return this.http.post(this.END_POINT_USERS, user.toJson(), options);
  }
  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  deleteToken() {
    sessionStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
