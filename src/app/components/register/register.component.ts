import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {User} from "../../models/user.model";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    NgIf,
    RouterLink,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private USER_ROLE = "USER";

  showErrorMessage: boolean = false;
  errorMessageText: string = "";
  hide = true;

  constructor(private authService: AuthService) {
  }

  register(registerForm: NgForm): void {
    if (!this.isFormValid(registerForm)) {
      return;
    }

    const user = new User(
      registerForm.value.name,
      registerForm.value.surname,
      registerForm.value.email,
      registerForm.value.username,
      registerForm.value.password,
      this.USER_ROLE
      );

    this.authService.register(user).subscribe(
      response => {
        console.log(response);
        this.showErrorMessage = false;
        this.authService.setToken(response.body);
      },
      error => {
        console.log(error);
        this.showErrorMessage = true;
        this.errorMessageText = "Las credenciales no son correctas. Por favor, inténtelo de nuevo.";
      });
  }

  isFormValid(registerForm: NgForm): boolean {
    let isValid = true;
    if (!registerForm.valid) {
      this.showErrorMessage = true;
      this.errorMessageText = "Todos los campos son necesarios.";

      if (registerForm.controls['password'].getError('minlength')) {
        this.errorMessageText = "La contraseña tiene que ser de al menos 6 characteres.";
      }
      else if (registerForm.value.password != registerForm.value["repeated-password"]) {
        this.errorMessageText = "Las contraseñas no coinciden.";
      }
      else if (registerForm.controls['email'].getError('email')) {
        this.errorMessageText = "Por favor introduce un email válido."
      }

      isValid = false;
    }

    return isValid;
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
