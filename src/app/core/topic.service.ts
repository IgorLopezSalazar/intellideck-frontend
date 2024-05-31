import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environments";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private END_POINT_TOPIC = environment.API_URL + '/topics';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getTopics(): Observable<any> {
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

    return this.http.get(this.END_POINT_TOPIC, options);
  }
}
