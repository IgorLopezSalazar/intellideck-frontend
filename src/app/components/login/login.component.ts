import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../core/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {lastValueFrom} from "rxjs";
import {CurrentDataService} from "../../core/local/current-data.service";

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

  constructor(private authService: AuthService, private currentDataService: CurrentDataService,
              private router: Router) {
  }

  async login(loginForm: NgForm) {
    if (!loginForm.valid) {
      this.showErrorMessage = true;
      this.errorMessageText = "Los dos campos son necesarios.";
      return;
    }

    const  userCredentials = {
      username: loginForm.value.username,
      password: loginForm.value.password
    };

    await this.executeLogin(userCredentials);
  }

  async executeLogin(userCredentials: {username: any, password: any}) {
    try {
      let loginResponse = await lastValueFrom(this.authService.login(userCredentials));
      this.showErrorMessage = false;
      this.authService.setToken(loginResponse.body);

      this.saveUserLogged();

      this.router.navigate(['']).then(() => {
        console.log('Navigation complete');
      }).catch(error => {
        console.error('Navigation error: ', error);
      });
    }
    catch (error: any) {
      console.log(error);
      this.showErrorMessage = true;
      this.errorMessageText = "Las credenciales no son correctas. Por favor, inténtelo de nuevo.";
    }
  }

  saveUserLogged() {
    this.authService.getUserLogged().subscribe(
      {
        next: response => {
          this.currentDataService.userLogged = response.body;
        },
        error: (error: any) => console.log(error)
      }
    );
  }

}
