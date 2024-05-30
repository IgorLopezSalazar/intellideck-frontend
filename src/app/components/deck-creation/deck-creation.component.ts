import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {DeckService} from "../../core/deck.service";
import {Deck} from "../../models/deck.model";
import {NgIf} from "@angular/common";
import {DeckDetailsFormComponent} from "../deck-details-form/deck-details-form.component";
import {CardListComponent} from "../card-list/card-list.component";

@Component({
  selector: 'app-deck-creation',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    CdkTextareaAutosize,
    MatIcon,
    MatButton,
    NgIf,
    MatError,
    DeckDetailsFormComponent,
    CardListComponent
  ],
  templateUrl: './deck-creation.component.html',
  styleUrl: './deck-creation.component.scss'
})
export class DeckCreationComponent {




}
