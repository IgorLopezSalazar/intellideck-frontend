import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {DeckTraining} from "../../models/deck-training.model";
import {Observable, of} from "rxjs";
import {CardTraining} from "../../models/card-training.model";
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Injectable({
  providedIn: 'root'
})
export class DeckTrainingService {

  private END_POINT_DECKS = environment.API_URL + '/decks';
  private END_POINT_DECK_TRAINING = '/deckTraining';

  constructor(private http: HttpClient, private auth: AuthService) { }

  createDeckTraining(deckTraining: DeckTraining): Observable<any> {
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

    console.log(deckTraining.toJson());
    console.log(deckTraining);

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckTraining.deckID + this.END_POINT_DECK_TRAINING;
    return this.http.post(endPointUrl, deckTraining.toJson(), options);
  }

  updateDeckTraining(cards: CardTraining[], completionTimeSeconds: number): Observable<any> {
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

    let deckTrainingInfo = JSON.stringify({
      completionTimeSeconds: completionTimeSeconds,
      cards: cards.map(cardTraining => (
        {
          id: cardTraining.card!._id,
          box: cardTraining.box
        }
      ))
    });
    console.log(deckTrainingInfo)

    let endPointUrl =   this.END_POINT_DECKS + '/' + cards.at(0)!.deckTraining?.deck + this.END_POINT_DECK_TRAINING;
    return this.http.put(endPointUrl, deckTrainingInfo, options);
  }

  getDeckTraining(deckID: string): Observable<any> {
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

    let endPointUrl =   this.END_POINT_DECKS + '/' + deckID + this.END_POINT_DECK_TRAINING;
    return this.http.get(endPointUrl, options);
  }
}
