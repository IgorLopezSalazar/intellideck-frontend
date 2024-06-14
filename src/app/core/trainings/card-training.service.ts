import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class CardTrainingService {

  //private END_POINT_DECKS = environment.API_URL + '/decks';
  //private END_POINT_PUBLISH = '/publish';
  //private END_POINT_FILTER = '/filter';

  constructor(private http: HttpClient, private auth: AuthService) { }


}
