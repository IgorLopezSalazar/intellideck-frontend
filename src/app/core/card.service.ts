import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Deck} from "../models/deck.model";
import {Observable, of} from "rxjs";
import {Card} from "../models/card.model";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private END_POINT_DECKS = environment.API_URL + '/decks';
  private END_POINT_CARDS = '/cards';

  constructor(private http: HttpClient, private auth: AuthService) { }

  createDeck(card: Card): Observable<any> {
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
    let endPointUrl =   this.END_POINT_DECKS + '/' + card.deckId + this.END_POINT_CARDS;
    return this.http.post(endPointUrl, card.toJson(), options);
  }
}
