import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {AuthService} from "../../core/auth.service";
import {of, throwError} from "rxjs";
import {NgForm} from "@angular/forms";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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
    spyOn(authService, 'register').and.returnValues(throwError(() => new Error()));
    component.register(<NgForm>{
      value: {
        name: "Test",
        surname: "Test",
        email: "test@test.com",
        username: "Test",
        password: "Test",
        "repeated-password": "Test"
      },
      valid: true
    });
    fixture.detectChanges();
    expect(component.showErrorMessage).toBeTruthy();
  });

  it('should warn detect passwords longer than 6 characters', () => {
    fixture.nativeElement.querySelector('input[name =name]').value = "Test";
    fixture.nativeElement.querySelector('input[name =surname]').value = "Test";
    fixture.nativeElement.querySelector('input[name =email]').value = "test@test.com";
    fixture.nativeElement.querySelector('input[name =username]').value = "Test";
    fixture.nativeElement.querySelector('input[name =password]').value = "Test";
    fixture.nativeElement.querySelector('input[name ="repeated-password"]').value = "Test";
    fixture.nativeElement.querySelectorAll('input').forEach((input: any) => {
      input.dispatchEvent(new Event('input'))
    });

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.showErrorMessage).toBeTruthy();
    expect(component.errorMessageText).toEqual("La contraseña tiene que ser de al menos 6 characteres.");
  });

  it('should warn detect email not valid', () => {
    fixture.nativeElement.querySelector('input[name =name]').value = "Test";
    fixture.nativeElement.querySelector('input[name =surname]').value = "Test";
    fixture.nativeElement.querySelector('input[name =email]').value = "test";
    fixture.nativeElement.querySelector('input[name =username]').value = "test";
    fixture.nativeElement.querySelector('input[name =password]').value = "Test123";
    fixture.nativeElement.querySelector('input[name ="repeated-password"]').value = "Test123";
    fixture.nativeElement.querySelectorAll('input').forEach((input: any) => {
      input.dispatchEvent(new Event('input'))
    });

    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(component.showErrorMessage).toBeTruthy();
    expect(component.errorMessageText).toEqual("Por favor introduce un email válido.");
  });

  it('should register', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'register').and.returnValues(of({
      name: "Test",
      surname: "Test",
      email: "test@test.com",
      username: "Test"}));
    component.register(<NgForm>{
      value: {
        name: "Test",
        surname: "Test",
        email: "test@test.com",
        username: "Test",
        password: "Test",
        "repeated-password": "Test"
      },
      valid: true
    });
    fixture.detectChanges();
    expect(component.showErrorMessage).toBeFalsy();
  });
});
