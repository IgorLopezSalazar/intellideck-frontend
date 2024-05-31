import {Topic} from "./topic.model";
import {Tag} from "./tag.model";

export class Deck {
  private _title : string;
  private _description : string | undefined;
  private _image? : File;
  private _imagePath? : string;
  private _isPublished : boolean | undefined;
  private _publishDate: Date | undefined;
  private _creator? : string;
  private _topic : Topic;
  private _tags: Tag[];

  constructor(title: string, topic: Topic) {
    this._title = title;
    this._topic = topic;
    this._tags = [];
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

  get imagePath(): string | undefined {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }

  get image(): File | undefined {
    return this._image;
  }

  set image(value: File) {
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


  public get topic(): Topic {
    return this._topic;
  }

  public set topic(value: Topic) {
    this._topic = value;
  }

  get creator(): string | undefined {
    return this._creator;
  }

  set creator(value: string) {
    this._creator = value;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  set tags(value: Tag[]) {
    this._tags = value;
  }

  toJson(): string {
    return JSON.stringify({
      title: this._title,
      topic: this._topic.id,
      description: this._description,
      image: this._imagePath,
      tags: this._tags?.map(tag => tag.id)
    });
  }
}
