export class Topic {
  private __id : string;
  private _name : string;

  constructor(id: string, name: string) {
    this.__id = id;
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get _id(): string {
    return this.__id;
  }

  public set _id(value: string) {
    this.__id = value;
  }


}
