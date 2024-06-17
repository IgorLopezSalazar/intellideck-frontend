import {Card} from "./card.model";

export enum Backtrack {
  BACKTRACK_FIRST = 'BACKTRACK_FIRST',
  BACKTRACK_PRIOR = 'BACKTRACK_PRIOR'
}

export class DeckTraining {
  private _startDate?: Date;
  private _boxAmount: number;
  private _backtrack: Backtrack;
  private _userID?: string;
  private _deckID: string;
  private _deck?: string;
  private _cards?: Card[];
  private _statistics?: { attempts: number, avgCompletionTimeSeconds: number};

  constructor(boxAmount: number, backtrack: Backtrack, deckID: string, cards?: Card[]) {
    this._boxAmount = boxAmount;
    this._backtrack = backtrack;
    this._deckID = deckID;
    this._cards = cards;
  }

  get boxAmount(): number {
    return this._boxAmount;
  }

  set boxAmount(value: number) {
    this._boxAmount = value;
  }

  get backtrack(): Backtrack {
    return this._backtrack;
  }

  set backtrack(value: Backtrack) {
    this._backtrack = value;
  }

  get startDate(): Date | undefined {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get userID(): string | undefined {
    return this._userID;
  }

  set userID(value: string) {
    this._userID = value;
  }

  get deckID(): string {
    return this._deckID;
  }

  set deckID(value: string) {
    this._deckID = value;
  }

  get deck(): string | undefined {
    return this._deck;
  }

  set deck(value: string) {
    this._deck = value;
  }

  get statistics(): { attempts: number; avgCompletionTimeSeconds: number } | undefined {
    return this._statistics;
  }

  set statistics(value: { attempts: number; avgCompletionTimeSeconds: number }) {
    this._statistics = value;
  }

  toJson() {
    return JSON.stringify({
      boxAmount: this._boxAmount,
      backtrack: this._backtrack,
      cards: this._cards?.map(card => ({ id: card._id, isShown: card.isShown ?? true }))
    });
  }
}
