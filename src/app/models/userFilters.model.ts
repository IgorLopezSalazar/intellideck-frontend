import {HttpParams} from "@angular/common/http";

export class UserFilters {
  private _username?: string;
  private _onlyFollowingUsers?: boolean;
  private _onlyFollowerUsers?: boolean;


  constructor(username?: string, onlyFollowingUsers?: boolean, onlyFollowerDecks?: boolean) {
    this._username = username;
    this._onlyFollowingUsers = onlyFollowingUsers;
    this._onlyFollowerUsers = onlyFollowerDecks;
  }


  get username(): string | undefined {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get onlyFollowingUsers(): boolean | undefined {
    return this._onlyFollowingUsers;
  }

  set onlyFollowingUsers(value: boolean) {
    this._onlyFollowingUsers = value;
  }

  get onlyFollowerUsers(): boolean | undefined {
    return this._onlyFollowerUsers;
  }

  set onlyFollowerUsers(value: boolean) {
    this._onlyFollowerUsers = value;
  }

  setUserFiltersParams(params: HttpParams) {
    if (this._username) params = params.append('username', this._username);
    if (this._onlyFollowerUsers) params = params.append('follower', this._onlyFollowerUsers);
    if (this._onlyFollowingUsers) params = params.append('followed', this._onlyFollowingUsers);

    console.log(this)
    return params;
  }
}
