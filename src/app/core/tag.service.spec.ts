import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';
import {HttpClient, } from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {AuthService} from "./auth.service";
import {Tag} from "../models/tag.model";

describe('TagService', () => {
  let service: TagService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ]
    });
    service = TestBed.inject(TagService);
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tag correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.getTag(new Tag("Name")).subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available getTag', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.getTag(new Tag("Name")).subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should get tags correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.getTags().subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available getTags', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.getTags().subscribe(data => expect(data.error).toBe('No token available'));
  });
});
