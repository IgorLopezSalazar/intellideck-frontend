import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Tag} from "../models/tag.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private END_POINT_IMAGES = environment.API_URL + '/images';

  constructor(private http: HttpClient, private auth: AuthService) { }

  postImage(image: File): Observable<any> {
    let token: string | null = this.auth.getToken();
    if (!token) {
      return of({ error: 'No token available' });
    }

    const options: any = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      observe: 'response'
    };

    const formData: FormData = new FormData();
    formData.append('file', image);

    return this.http.post(this.END_POINT_IMAGES, formData, options);
  }
}
