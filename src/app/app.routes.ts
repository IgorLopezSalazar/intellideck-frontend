import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DeckCreationComponent} from "./components/deck-creation/deck-creation.component";

export const routes: Routes = [
  // { path: '', component: TimeLineComponent },
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: RegisterComponent},
  { path: 'deck-creation', component: DeckCreationComponent}
];
