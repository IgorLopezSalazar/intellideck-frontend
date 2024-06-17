import { Injectable } from '@angular/core';
import {Deck} from "../../models/deck.model";
import {CardTraining} from "../../models/card-training.model";
import {DeckTraining} from "../../models/deck-training.model";
import {unwrapConstructorDependencies} from "@angular/compiler-cli/src/ngtsc/annotations/common";

@Injectable({
  providedIn: 'root'
})
export class CurrentDataService {

  private _deck?: Deck;
  private _cardsTraining?: CardTraining[];
  private _allCardsTrainings?: CardTraining[];
  private _deckTraining?: DeckTraining;
  private _isOfficialTraining: boolean = false;
  private _completionTimeSeconds?: number;
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

  get completionTimeSeconds(): number | undefined {
    return this._completionTimeSeconds;
  }

  set completionTimeSeconds(value: number) {
    this._completionTimeSeconds = value;
  }

  get deckTraining(): DeckTraining | undefined{
    return this._deckTraining;
  }

  set deckTraining(value: DeckTraining) {
    this._deckTraining = value;
  }

  finishTraining(deleteDeck: boolean) {
    if (deleteDeck) this._deck = undefined;
    this._cardsTraining = undefined;
    this._allCardsTrainings = undefined;
    this._deckTraining = undefined;
    this._isOfficialTraining = false;
    this._completionTimeSeconds = undefined;
  }
}
