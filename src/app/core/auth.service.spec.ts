import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {User} from "../models/user.model";

describe('AuthService', () => {
  let service: AuthService;
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
    service = TestBed.inject(AuthService);
    httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login correctly', () => {
    service.login({username: "username", password: "password"}).subscribe(data => expect(data.status).toBe(200));
  });

  it('should register correctly', () => {
    service.register(new User("name", "surname", "em@il.com",
      "username", "password", "USER")).subscribe(data => expect(data.status).toBe(200));
  });
});
