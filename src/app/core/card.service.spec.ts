import {TestBed} from '@angular/core/testing';

import {CardService} from './card.service';
import {HttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {AuthService} from "./auth.service";
import {Card, WhereImageEnum} from "../models/card.model";

describe('CardService', () => {
  let service: CardService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ]});
    service = TestBed.inject(CardService);
    httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.put.and.returnValue(of({ status: 200, data: {} }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create card correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.createCard(new Card(WhereImageEnum.NONE)).subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available createCard', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.createCard(new Card(WhereImageEnum.NONE)).subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should get cards of deck correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.getCardsFromDeck("123456789abcdef").subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available getCardsFromDeck', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.getCardsFromDeck("123456789abcdef").subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should update card correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.updateCard(new Card(WhereImageEnum.NONE)).subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available updateCard', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.updateCard(new Card(WhereImageEnum.NONE)).subscribe(data => expect(data.error).toBe('No token available'));
  });
});
