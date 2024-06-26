import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Deck} from "../models/deck.model";
import {AuthService} from "./auth.service";
import {DeckFilters} from "../models/deckFilters.model";

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private END_POINT_DECKS = environment.API_URL + '/decks';
  private END_POINT_PUBLISH = '/publish';
  private END_POINT_FILTER = '/filter';
  private END_POINT_OWN = '/own';
  private END_POINT_COPY = '/copy';
  private END_POINT_FOLLOWED = '/followed';
  private END_POINT_RATINGS= '/ratings';
  private END_POINT_TODAY = '/today';
  private END_POINT_TIMELINE = '/timeline';
  private END_POINT_USER = '/user';

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

  getDeck(deckID: string): Observable<any> {
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

    return this.http.get(this.END_POINT_DECKS + '/' + deckID, options);
  }

  getUserDecks(userID: string): Observable<any> {
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

    return this.http.get(this.END_POINT_DECKS + this.END_POINT_USER + '/' + userID, options);
  }

  getUserFollowedDecks(userID: string): Observable<any> {
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

    return this.http.get(this.END_POINT_DECKS + this.END_POINT_FOLLOWED + '/' + userID, options);
  }

  getLoggedUserDeckList(): Observable<any> {
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

    return this.http.get(this.END_POINT_DECKS + this.END_POINT_OWN , options);
  }

  getStudyDecksToday(): Observable<any> {
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

    return this.http.get(this.END_POINT_DECKS + this.END_POINT_TODAY, options);
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

    return this.http.get(this.END_POINT_DECKS + this.END_POINT_TIMELINE, options);
  }

  updateDeck(deck: Deck): Observable<any> {
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

    return this.http.put(this.END_POINT_DECKS + "/" + deck._id, deck.toJson(), options);
  }

  publishDeck(deckId: string): Observable<any> {
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
    return this.http.put(this.END_POINT_DECKS + "/" + deckId + this.END_POINT_PUBLISH, {}, options);
  }

  filterDecks(deckFilters: DeckFilters): Observable<any> {
    let token: string | null = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    let params = new HttpParams();

    params = deckFilters.setDeckFiltersParams(params);

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      params: params,
      observe: 'response'
    };

    return this.http.get(this.END_POINT_DECKS + this.END_POINT_FILTER, options);
  }

  updateDeckFollowStatus(deckID: string , follow: boolean): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckID;
    endPointUrl += follow ? '/follow' : '/unfollow';
    return this.http.put(endPointUrl, {}, options);
  }

  copyDeck(deck: Deck): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deck._id + this.END_POINT_COPY;
    return this.http.post(endPointUrl, {}, options);
  }

  deleteDeck(deckID: string): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckID;
    return this.http.delete(endPointUrl, options);
  }

  getUserDeckRating(deckID: string): Observable<any> {
    let token = this.auth.getToken();
    if (!token) {
      return of({error: 'No token available'});
    }

    const options: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      }),
      observe: 'response'
    };

    return this.http.get(this.END_POINT_DECKS + '/' + deckID + this.END_POINT_RATINGS, options);
  }

  createUserDeckRating(deckID: string, newRate: number): Observable<any> {
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

    return this.http.post(this.END_POINT_DECKS + '/' + deckID + this.END_POINT_RATINGS, {rate: newRate * 2}, options);
  }

  updateUserDeckRating(deckID: string, newRate: number): Observable<any> {
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

    return this.http.put(this.END_POINT_DECKS + '/' + deckID + this.END_POINT_RATINGS, {rate: newRate * 2}, options);
  }

  deleteUserDeckRating(deckID: string): Observable<any> {
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

    return this.http.delete(this.END_POINT_DECKS + '/' + deckID + this.END_POINT_RATINGS, options);
  }
}
