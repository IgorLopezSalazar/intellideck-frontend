export class Deck {
  private _title : string;
  private _description : string | undefined;
  private _image : string | undefined;
  private _isPublished : boolean | undefined;
  private _publishDate: Date | undefined;
  //private creator? : IUser;
  //private topic : ITopic;
  //private tags: ITag[];

  constructor(title: string) {
    this._title = title;
  }


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  get image(): string | undefined {
    return this._image;
  }

  set image(value: string | undefined) {
    this._image = value;
  }

  get isPublished(): boolean | undefined {
    return this._isPublished;
  }

  set isPublished(value: boolean | undefined) {
    this._isPublished = value;
  }

  get publishDate(): Date | undefined {
    return this._publishDate;
  }

  set publishDate(value: Date | undefined) {
    this._publishDate = value;
  }

  toJson(): string {
    return JSON.stringify({
      title: this._title,
      description: this._description,
      image: this._image,
    });
  }
}
