import {Component, Input} from '@angular/core';
import {User} from "../../../models/user.model";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../../core/user.service";
import {CurrentDataService} from "../../../core/local/current-data.service";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  @Input() user!: User;
  isFollowing: boolean = false;

  constructor(private userService: UserService, private currentDataService: CurrentDataService,
              private router: Router) {

  }

  ngOnInit() {
    this.isFollowing = this.checkIfFollowing();
  }

  async followUser(event: Event) {
    event.stopPropagation();

    try {
      const response = await lastValueFrom(this.userService.updateUserFollowStatus(this.user._id!, !this.isFollowing));
      this.currentDataService.userLogged = response.body;
    }
    catch (error: any) {
      console.log(error);
    }

    this.isFollowing = this.checkIfFollowing();
  }

  checkIfFollowing(): boolean {
    if (this.currentDataService.userLogged?.followedUsers) {
      return this.currentDataService.userLogged.followedUsers.some(followedUser => followedUser._id === this.user._id );
    }
    return false;
  }

  openUser() {
    this.currentDataService.selectedUser = this.user;

    this.router.navigate(['profile']).then(() => {
      console.log('Navigation complete: ' + this.router.url);
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}
