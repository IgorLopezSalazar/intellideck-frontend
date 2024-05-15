import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";

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
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
