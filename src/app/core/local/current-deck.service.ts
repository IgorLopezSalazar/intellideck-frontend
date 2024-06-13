import { Injectable } from '@angular/core';
import {Deck} from "../../models/deck.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentDeckService {

  private _deck?: Deck;
  constructor() { }

  get deck(): Deck | undefined {
    return this._deck;
  }

  set deck(value: Deck) {
    this._deck = value;
  }
}
