import { TestBed } from '@angular/core/testing';

import { DeckService } from './deck.service';
import {HttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {AuthService} from "./auth.service";
import {Deck} from "../models/deck.model";
import {Topic} from "../models/topic.model";
import {DeckFilters} from "../models/deckFilters.model";

describe('DeckService', () => {
  let service: DeckService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ]});
    service = TestBed.inject(DeckService);
    httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.put.and.returnValue(of({ status: 200, data: {} }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create deck correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.createDeck(new Deck("Title", new Topic("123456789abcdef", "Title")))
      .subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available createDeck', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.createDeck(new Deck("Title", new Topic("123456789abcdef", "Title")))
      .subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should detect no token available getTimelineDecks', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.getTimelineDecks(0).subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should update deck correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.updateDeck(new Deck("Title", new Topic("123456789abcdef", "Title")))
      .subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available updateDeck', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.updateDeck(new Deck("Title", new Topic("123456789abcdef", "Title")))
      .subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should publish deck correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.publishDeck("123456789abcdef").subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available publishDeck', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.publishDeck("123456789abcdef").subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should filter decks correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.filterDecks(new DeckFilters()).subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available filterDecks', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.filterDecks(new DeckFilters()).subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should follow deck correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.updateDeckFollowStatus("123456789abcdef", true).subscribe(data => expect(data.status).toBe(200));
  });

  it('should unfollow deck correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.updateDeckFollowStatus("123456789abcdef", false).subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available updateDeckFollowStatus', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.updateDeckFollowStatus("123456789abcdef", true).subscribe(data => expect(data.error).toBe('No token available'));
  });
});
