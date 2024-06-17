import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {Observable, of, throwError} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect form is invalid', () => {
    fixture.nativeElement.querySelector('button').click();
    expect(component.showErrorMessage).toBeTruthy();
  });

  it('should warn login data is not correct', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValues(throwError(() => new Error()));
    component.login(<NgForm>{
      value: {
        username: "Test",
        password: "Test"
      },
      valid: false
    });
    fixture.detectChanges();
    expect(component.showErrorMessage).toBeTruthy();
  });

  it('should login', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValues(of("Bearer sdfdagdfgsdfgfdbdfbdf"));
    component.login(<NgForm>{
      value: {
        username: "Test",
        password: "Test"
      },
      valid: true
    });
    fixture.detectChanges();
    expect(component.showErrorMessage).toBeFalsy();
  });
});
