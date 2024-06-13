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

  constructor(private http: HttpClient, private auth: AuthService) { }

  filterUsers(userFilters: UserFilters): Observable<any> {
    let token: string | null = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    let params = new HttpParams();

    params = userFilters.setDeckFiltersParams(params);

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
}
