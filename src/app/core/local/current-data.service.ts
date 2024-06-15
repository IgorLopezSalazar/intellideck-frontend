import { Injectable } from '@angular/core';
import {Deck} from "../../models/deck.model";
import {CardTraining} from "../../models/card-training.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentDataService {

  private _deck?: Deck;
  private _cardsTraining?: CardTraining[];
  private _allCardsTrainings?: CardTraining[];
  private _isOfficialTraining: boolean = false;

  constructor() { }

  get deck(): Deck | undefined {
    return this._deck;
  }

  set deck(value: Deck) {
    this._deck = value;
  }

  get cardsTraining(): CardTraining[] | undefined {
    return this._cardsTraining;
  }

  set cardsTraining(value: CardTraining[]) {
    this._cardsTraining = value;
  }

  get allCardsTrainings(): CardTraining[] | undefined {
    return this._allCardsTrainings;
  }

  set allCardsTrainings(value: CardTraining[]) {
    this._allCardsTrainings = value;
  }

  get isOfficialTraining(): boolean {
    return this._isOfficialTraining;
  }

  set isOfficialTraining(value: boolean) {
    this._isOfficialTraining = value;
  }
}
