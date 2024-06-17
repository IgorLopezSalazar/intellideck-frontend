import {Topic} from "./topic.model";
import {Tag} from "./tag.model";
import {User} from "./user.model";
import {Card} from "./card.model";
import {DeckTraining} from "./deck-training.model";

export class CardTraining {
  //private nextTraining: Date;
  private _isShown: boolean;
  private _box: number;
  private _deckTraining?: DeckTraining;
  private _deckTrainingID?: string;
  private _card?: Card;
  private _cardID?: string;

  constructor(isShown: boolean, box: number, deckTraining?: DeckTraining, card?: Card) {
    this._isShown = isShown;
    this._box = box;
    this._deckTraining = deckTraining;
    this._card = card;
  }

  get isShown(): boolean {
    return this._isShown;
  }

  set isShown(value: boolean) {
    this._isShown = value;
  }

  get box(): number {
    return this._box;
  }

  set box(value: number) {
    this._box = value;
  }

  get deckTraining(): DeckTraining | undefined {
    return this._deckTraining;
  }

  set deckTraining(value: DeckTraining) {
    this._deckTraining = value;
  }

  get deckTrainingID(): string | undefined {
    return this._deckTrainingID;
  }

  set deckTrainingID(value: string) {
    this._deckTrainingID = value;
  }

  get card(): Card | undefined {
    return this._card;
  }

  set card(value: Card) {
    this._card = value;
  }

  get cardID(): string | undefined {
    return this._cardID;
  }

  set cardID(value: string) {
    this._cardID = value;
  }
}
