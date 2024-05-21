import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, tap} from "rxjs";
import {environment} from '../../environments/environments';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private END_POINT = environment.API_URL + '/users';
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

  register(name: string, username: string, email: string, password: string, role: string): any {
    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    };
    const body: any = {

    };
    this.http.post(this.END_POINT_LOGIN, body, options)
      .subscribe(response => {
        console.log(response)
      },
      error => {
        console.log(error);
      });
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

  //
  // login1(mobile: number, password: string): Observable<User> {
  //   return this.httpService.authBasic(mobile, password)
  //     .post(AuthService.END_POINT)
  //     .pipe(
  //       map(jsonToken => {
  //         const jwtHelper = new JwtHelperService();
  //         this.user = jsonToken; // {token:jwt} => user.token = jwt
  //         this.user.mobile = jwtHelper.decodeToken(jsonToken.token).user;  // secret key is not necessary
  //         this.user.name = jwtHelper.decodeToken(jsonToken.token).name;
  //         this.user.role = jwtHelper.decodeToken(jsonToken.token).role;
  //         console.log(jsonToken);
  //
  //         if (this.untilOperator()) {
  //           const sessionRecord: SessionRecord = {
  //             mobile: mobile,
  //             firstLogin: this.getNowFormattedDate(),
  //           }
  //           this.httpService.authBasic(mobile, password)
  //             .post(EndPoints.SESSION_RECORDS, sessionRecord)
  //             .subscribe(
  //               sessionRecord => console.log('Session record:', sessionRecord)
  //             );
  //         }
  //         return this.user;
  //       })
  //     );
  // }
}
