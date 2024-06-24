import {Topic} from "./topic.model";
import {Tag} from "./tag.model";
import {User} from "./user.model";
import {Card} from "./card.model";

export class Deck {
  private __id? : string;
  private _title : string;
  private _description : string | undefined;
  private _imageFile? : File;
  private _image? : string;
  private _isPublished : boolean | undefined;
  private _publishDate: Date | undefined;
  private _creator? : User;
  private _topic : Topic;
  private _tags: Tag[];
  private _cards?: Card[];
  private _avgDeckRating?: number;

  constructor(title: string, topic: Topic) {
    this._title = title;
    this._topic = topic;
    this._tags = [];
  }

  get _id(): string | undefined {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
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

  set image(value: string) {
    this._image = value;
  }

  get imageFile(): File | undefined {
    return this._imageFile;
  }

  set imageFile(value: File) {
    this._imageFile = value;
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


  public get topic(): Topic {
    return this._topic;
  }

  public set topic(value: Topic) {
    this._topic = value;
  }

  get creator(): User | undefined {
    return this._creator;
  }

  set creator(value: User) {
    this._creator = value;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  set tags(value: Tag[]) {
    this._tags = value;
  }

  get cards(): Card[] | undefined {
    return this._cards;
  }

  set cards(value: Card[]) {
    this._cards = value;
  }

  get avgDeckRating(): number | undefined {
    return this._avgDeckRating;
  }

  set avgDeckRating(value: number) {
    this._avgDeckRating = value;
  }

  toJson(): string {
    return JSON.stringify({
      title: this._title,
      topic: this._topic._id,
      description: this._description,
      image: this._image,
      tags: this._tags?.map(tag => tag.id)
    });
  }
}
