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

  constructor(whereImage: WhereImageEnum, question?: string, answer?: string, deck?: string, image?: File, imagePath?: string) {
    this._question = question;
    this._answer = answer;
    this._whereImage = whereImage;
    this._deckId = deck;
    this._image = image;
    this._imagePath = imagePath;
  }

  copy() {
    return new Card(
      this.whereImage,
      this.question,
      this.answer,
      this.deckId,
      this.image,
      this.imagePath
    );
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

  public deleteImage() {
    this._image = undefined;
  }

  get imagePath(): string | undefined {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
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
      image : this.imagePath,
      whereImage: this.whereImage,
      deckId: this.deckId
    });
  }
}
