import { TestBed } from '@angular/core/testing';

import { ImagesService } from './images.service';
import {HttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {AuthService} from "./auth.service";

describe('ImagesService', () => {
  let service: ImagesService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ]
    });
    service = TestBed.inject(ImagesService);
    httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post image correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.postImage(new File([], "")).subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available postImage', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.postImage(new File([], "")).subscribe(data => expect(data.error).toBe('No token available'));
  });
});
