import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {AuthService} from "./auth.service";
import {UserFilters} from "../models/userFilters.model";

describe('UserService', () => {
  let service: UserService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['put', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ]});
    service = TestBed.inject(UserService);
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.put.and.returnValue(of({ status: 200, data: {} }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter users correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.filterUsers(new UserFilters()).subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available filterUsers', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.filterUsers(new UserFilters()).subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should detect no token available getRecommendedUsers', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.getRecommendedUsers().subscribe(data => expect(data.error).toBe('No token available'));
  });

  it('should follow user correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.updateUserFollowStatus("123456789abcdef", true).subscribe(data => expect(data.status).toBe(200));
  });

  it('should unfollow user correctly', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues("Bearer afadgfbzdfbhgdgbghbgfxgvfxxfgfg");
    service.updateUserFollowStatus("123456789abcdef", false).subscribe(data => expect(data.status).toBe(200));
  });

  it('should detect no token available updateUserFollowStatus', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, "getToken").and.returnValues();
    service.updateUserFollowStatus("123456789abcdef", true).subscribe(data => expect(data.error).toBe('No token available'));
  });
});
