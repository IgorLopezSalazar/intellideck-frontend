import {Topic} from "./topic.model";
import {Tag} from "./tag.model";
import {User} from "./user.model";
import {Card} from "./card.model";

export class DeckTraining {
  private _startDate: Date;
  //private boxAmount: number;
  //private backtrack: string;
  private _userID: string;
  private _deckID: string;
  //private statistics: IStatistics;

  constructor(startDate: Date, userID: string, deckID: string) {
    this._startDate = startDate;
    this._userID = userID;
    this._deckID = deckID;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get userID(): string {
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
}
