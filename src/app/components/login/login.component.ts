import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../core/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatFormField,
    MatInputModule,
    MatButton,
    HttpClientModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  showErrorMessage: boolean = false;
  errorMessageText: string = "";

  constructor(private authService: AuthService) {
  }

  login(loginForm: NgForm): void {
    if (!loginForm.valid) {
      this.showErrorMessage = true;
      this.errorMessageText = "Los dos campos son necesarios.";
      return;
    }

    const  userCredentials = {
      username: loginForm.value.username,
      password: loginForm.value.password
    };

    this.authService.login(userCredentials).subscribe(
      {
        next: response => {
          this.showErrorMessage = false;
          this.authService.setToken(response.body);
        },
        error: (error: any) => {
          console.log(error);
          this.showErrorMessage = true;
          this.errorMessageText = "Las credenciales no son correctas. Por favor, inténtelo de nuevo.";
        }
      }
    );
  }

}
