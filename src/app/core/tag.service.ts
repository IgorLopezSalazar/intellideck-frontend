import { Injectable } from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {Tag} from "../models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private END_POINT_TAG = environment.API_URL + '/tags';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getTag(tag: Tag): Observable<any> {
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

    return this.http.get(this.END_POINT_TAG + "/" + tag.name, options);
  }

  getTags(): Observable<any> {
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

    return this.http.get(this.END_POINT_TAG, options);
  }
}
