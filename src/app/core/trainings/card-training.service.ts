import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardTrainingService {

  private END_POINT_DECKS = environment.API_URL + '/decks';
  private END_POINT_DECK_TRAINING_CARDS = '/deckTraining/cards';
  private END_POINT_TODAY = '/today';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getDeckTrainingCards(deckID: string): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckID + this.END_POINT_DECK_TRAINING_CARDS;
    return this.http.get(endPointUrl, options);
  }

  getTodayDeckTrainingCards(deckID: string): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckID + this.END_POINT_DECK_TRAINING_CARDS + this.END_POINT_TODAY;
    return this.http.get(endPointUrl, options);
  }

  updateCardTrainingVisibility(deckID: string, cardID: string, isShown: boolean): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckID + this.END_POINT_DECK_TRAINING_CARDS + '/' + cardID;
    endPointUrl += isShown ? '/show' : '/hide';
    return this.http.put(endPointUrl, {}, options);
  }
}
