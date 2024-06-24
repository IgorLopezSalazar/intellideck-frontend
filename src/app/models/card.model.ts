export enum WhereImageEnum {
  NONE = 'NONE',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER'
}

export class Card {
  private __id? : string;
  private _question? : string;
  private _answer? : string;
  private _imageFile? : File;
  private _image? : string;
  private _whereImage: WhereImageEnum;
  private _deck?: string;
  private _isShown: boolean = true;

  constructor(whereImage: WhereImageEnum, question?: string, answer?: string, deck?: string,
              image?: File, imagePath?: string, isShown?: boolean) {
    this._question = question;
    this._answer = answer;
    this._whereImage = whereImage;
    this._deck = deck;
    this._imageFile = image;
    this._image = imagePath;
    this._isShown = isShown ?? true;
  }

  get _id(): string | undefined {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
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

  get imageFile(): File | undefined {
    return this._imageFile;
  }

  set imageFile(value: File | undefined) {
    this._imageFile = value;
  }

  get image(): string | undefined {
    return this._image;
  }

  set image(value: string | undefined) {
    this._image = value;
  }

  get whereImage(): WhereImageEnum {
    return this._whereImage;
  }

  set whereImage(value: WhereImageEnum) {
    this._whereImage = value;
  }

  get deck(): string | undefined {
    return this._deck;
  }

  set deck(value: string) {
    this._deck = value;
  }

  get isShown(): boolean {
    return this._isShown;
  }

  set isShown(value: boolean) {
    this._isShown = value;
  }

  public toJson() {
    return JSON.stringify({
      question : this.question,
      answer : this.answer,
      image : this.image,
      whereImage: this.whereImage,
      deckId: this.deck
    });
  }
}
