import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Deck} from "../models/deck.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private END_POINT_DECKS = environment.API_URL + '/decks';

  constructor(private http: HttpClient, private auth: AuthService) { }

  createDeck(deck: Deck): Observable<any> {
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

    return this.http.post(this.END_POINT_DECKS, deck.toJson(), options);
  }

  getTimelineDecks(page: number): Observable<any> {
    let token = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    const params = new HttpParams().set('page', page.toString());

    const options: any = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      params: params,
      observe: 'response'
    };

    return this.http.get(this.END_POINT_DECKS + "/timeline", options);
  }
}
