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
  //private statistics: IStatistics;

  constructor(boxAmount: number, backtrack: Backtrack, deckID: string) {
    this._boxAmount = boxAmount;
    this._backtrack = backtrack;
    this._deckID = deckID;
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

  toJson() {
    return JSON.stringify({
      boxAmount: this._boxAmount,
      backtrack: this._backtrack
    });
  }
}
