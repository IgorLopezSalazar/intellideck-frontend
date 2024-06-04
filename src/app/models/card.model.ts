export enum WhereImageEnum {
  NONE = 'NONE',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER'
}

export class Card {
  private _question? : string;
  private _answer? : string;
  private _image? : File;
  private _imagePath? : string;
  private _whereImage: WhereImageEnum;
  private _deckId?: string;

  constructor(whereImage: WhereImageEnum, question?: string, answer?: string, deck?: string) {
    this._question = question;
    this._answer = answer;
    this._whereImage = whereImage;
    this._deckId = deck;
  }


  get question(): string | undefined {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }

  get answer(): string | undefined {
    return this._answer;
  }

  set answer(value: string) {
    this._answer = value;
  }

  get image(): File | undefined {
    return this._image;
  }

  set image(value: File) {
    this._image = value;
  }

  get whereImage(): WhereImageEnum {
    return this._whereImage;
  }

  set whereImage(value: WhereImageEnum) {
    this._whereImage = value;
  }

  get deckId(): string | undefined {
    return this._deckId;
  }

  set deckId(value: string) {
    this._deckId = value;
  }
}
