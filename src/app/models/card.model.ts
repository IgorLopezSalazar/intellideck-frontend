enum WhereImageEnum {
  NONE = 'NONE',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER'
}

export class Card {
  private _question : string;
  private _answer : string;
  private _image? : string;
  private _whereImage: WhereImageEnum;
  private _deckId: string;

  constructor(question: string, answer: string, whereImage: WhereImageEnum, deck: string) {
    this._question = question;
    this._answer = answer;
    this._whereImage = whereImage;
    this._deckId = deck;
  }


  get question(): string {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }

  get answer(): string {
    return this._answer;
  }

  set answer(value: string) {
    this._answer = value;
  }

  get image(): string | undefined {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get whereImage(): WhereImageEnum {
    return this._whereImage;
  }

  set whereImage(value: WhereImageEnum) {
    this._whereImage = value;
  }

  get deckId(): string {
    return this._deckId;
  }

  set deckId(value: string) {
    this._deckId = value;
  }
}
