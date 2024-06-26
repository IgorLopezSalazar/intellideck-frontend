import {HttpParams} from "@angular/common/http";

export class DeckFilters {
  private _title?: string;
  private _publishDate?: Date;
  private _creator? : string;
  private _topic?: string;
  private _tag?: string;
  private _minDeckRating?: number;
  private _onlyFollowerDecks?: boolean;

  constructor(title?: string,publishDate?: Date, creator?: string, topic?: string,
              tag?: string, minDeckRating?: number, onlyFollowerDecks?: boolean) {
    this._title = title;
    this._publishDate = publishDate;
    this._creator = creator;
    this._topic = topic;
    this._tag = tag;
    this._minDeckRating = minDeckRating;
    this._onlyFollowerDecks = onlyFollowerDecks;
  }

  get title(): string | undefined {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get publishDate(): Date | undefined {
    return this._publishDate;
  }

  set publishDate(value: Date | undefined) {
    this._publishDate = value;
  }

  get creator(): string | undefined {
    return this._creator;
  }

  set creator(value: string | undefined) {
    this._creator = value;
  }

  get topic(): string | undefined {
    return this._topic;
  }

  set topic(value: string) {
    this._topic = value;
  }

  get tag(): string | undefined {
    return this._tag;
  }

  set tag(value: string) {
    this._tag = value;
  }

  get minDeckRating(): number | undefined {
    return this._minDeckRating;
  }

  set minDeckRating(value: number) {
    this._minDeckRating = value;
  }

  get onlyFollowerDecks(): boolean | undefined   {
    return this._onlyFollowerDecks;
  }

  set onlyFollowerDecks(value: boolean) {
    this._onlyFollowerDecks = value;
  }

  isEmpty() {
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        if (this[key] !== undefined) {
          return false;
        }
      }
    }
    return true;
  }

  setDeckFiltersParams(params: HttpParams) {
    if (this._title) params = params.append('title', this._title);
    if (this._publishDate) params = params.append('date', this.formatDate(this._publishDate));
    if (this._creator) params = params.append('creator', this._creator);
    if (this._topic) params = params.append('topic', this._topic);
    if (this._tag) params = params.append('tag', this._tag);
    if (this._minDeckRating) params = params.append('avgDeckRating', this._minDeckRating * 2);
    if (this._onlyFollowerDecks) params = params.append('followed', this._onlyFollowerDecks);

    console.log(this)
    return params;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
