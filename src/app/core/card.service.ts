import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {Card} from "../models/card.model";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private END_POINT_DECKS = environment.API_URL + '/decks';
  private END_POINT_CARDS = '/cards';

  constructor(private http: HttpClient, private auth: AuthService) { }

  createCard(card: Card): Observable<any> {
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
    let endPointUrl =   this.END_POINT_DECKS + '/' + card.deck + this.END_POINT_CARDS;
    return this.http.post(endPointUrl, card.toJson(), options);
  }

  getCardsFromDeck(deckId: string): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckId + this.END_POINT_CARDS;
    return this.http.get(endPointUrl, options);
  }

  updateCard(card: Card): Observable<any> {
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

    return this.http.put(this.END_POINT_DECKS + "/" + card.deck + this.END_POINT_CARDS + "/" + card._id, card.toJson(), options);
  }

  deleteCard(deckID: string, cardID: string): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckID + this.END_POINT_CARDS + '/' + cardID;
    return this.http.delete(endPointUrl, options);
  }
}
