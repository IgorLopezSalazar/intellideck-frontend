export class Tag {
  private _id? : string;
  private _name : string;

  constructor(name: string) {
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  public toJsonID() {
    return JSON.stringify({
      _id: this._id
    });
  }
}
