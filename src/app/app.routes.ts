import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DeckCreationComponent} from "./components/deck-creation/deck-creation.component";
import {authGuard} from "./auth.guard";
import {TimelineComponent} from "./components/timeline/timeline.component";
import {OwnDeckComponent} from "./components/own-deck/own-deck.component";
import {ExternalDeckComponent} from "./components/external-deck/external-deck.component";

export const routes: Routes = [
  { path: '', component: TimelineComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: RegisterComponent},
  { path: 'deck-creation', component: DeckCreationComponent, canActivate: [authGuard]},
  { path: 'own-deck', component: OwnDeckComponent, canActivate: [authGuard]},
  { path: 'deck', component: ExternalDeckComponent, canActivate: [authGuard]}
];
