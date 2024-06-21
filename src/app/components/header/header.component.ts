import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {CurrentDataService} from "../../core/local/current-data.service";
import {AuthService} from "../../core/auth.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    NgOptimizedImage,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  username: string = ' ';

  constructor(private currentDataService: CurrentDataService, private authService: AuthService,
              private router: Router) {
  }

  async ngOnInit() {
    if (!this.currentDataService.userLogged?.username)
      await this.saveUserLogged();

    this.username = this.currentDataService.userLogged!.username;
  }

  async saveUserLogged() {
    try {
      const response = await lastValueFrom(this.authService.getUserLogged());
      this.currentDataService.userLogged = response.body;
    }
    catch (error: any) {
      console.log(error);
      this.redirectToLogin();
    }
  }

  logout() {
    this.authService.deleteToken();
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.router.navigate(['/login']).then(() => {
      console.log('Navigation complete ' + this.router.url);
    }).catch(error => {
      console.error('Navigation error: ', error);
    });
  }
}
