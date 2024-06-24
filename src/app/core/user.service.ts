import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {UserFilters} from "../models/userFilters.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private END_POINT_USERS = environment.API_URL + '/users';
  private END_POINT_FILTER = '/filter';
  private END_POINT_TIMELINE = '/timeline';
  private END_POINT_FOLLOWED = '/followed';
  private END_POINT_FOLLOWERS = '/followers';

  constructor(private http: HttpClient, private auth: AuthService) { }

  filterUsers(userFilters: UserFilters): Observable<any> {
    let token: string | null = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    let params = new HttpParams();

    params = userFilters.setUserFiltersParams(params);

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      params: params,
      observe: 'response'
    };

    return this.http.get(this.END_POINT_USERS + this.END_POINT_FILTER, options);
  }

  getRecommendedUsers(): Observable<any> {
    let token: string | null = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      observe: 'response'
    };

    return this.http.get(this.END_POINT_USERS + this.END_POINT_TIMELINE, options);
  }

  getUserFollowedUsers(userID: string): Observable<any> {
    let token = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    const options: any = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      observe: 'response'
    };

    return this.http.get(this.END_POINT_USERS + this.END_POINT_FOLLOWED + '/' + userID, options);
  }

  getUserFollowerUsers(userID: string): Observable<any> {
    let token = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    const options: any = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      observe: 'response'
    };

    return this.http.get(this.END_POINT_USERS + this.END_POINT_FOLLOWERS + '/' + userID, options);
  }

  updateUserFollowStatus(userID: string , follow: boolean): Observable<any> {
    let token: string | null = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      observe: 'response'
    };

    let endPointUrl =   this.END_POINT_USERS + '/' + userID;
    endPointUrl += follow ? '/follow' : '/unfollow';
    return this.http.put(endPointUrl, {}, options);
  }
}
