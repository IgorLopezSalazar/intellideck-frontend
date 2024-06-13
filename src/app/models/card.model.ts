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
  private _deckId?: string;

  constructor(whereImage: WhereImageEnum, question?: string, answer?: string, deck?: string, image?: File, imagePath?: string, _id?: string) {
    this._question = question;
    this._answer = answer;
    this._whereImage = whereImage;
    this._deckId = deck;
    this._imageFile = image;
    this._image = imagePath;
    this.__id = _id;
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

  get deckId(): string | undefined {
    return this._deckId;
  }

  set deckId(value: string) {
    this._deckId = value;
  }

  public toJson() {
    return JSON.stringify({
      question : this.question,
      answer : this.answer,
      image : this.image,
      whereImage: this.whereImage,
      deckId: this.deckId
    });
  }
}
