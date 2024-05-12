import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { userService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store/user.reducer';
import { selectUserById } from 'src/app/store/user.selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  users: any[] = [];
  userId: any = 0;
  user: any = {};
  isLoading: boolean = true;
  constructor(
    private _userService: userService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private store: Store<AppState>
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const newUserId = this.route.snapshot.paramMap.get('id');
        if (newUserId != this.userId) {
          this.userId = newUserId;
          this.checkUsers();
        }
      }
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  updateUserDetails(): void {
    if (this.userId) {
      // this.user = this.users.find(user => user.id == this.userId);
      this.store.pipe(select(selectUserById(this.userId))).subscribe((Users: any) => {
        if (Users) {

        }
      });
      this.isLoading = false;
    } else {
      this.user = {};
    }
  }

  checkUsers() {
    const isOnline = navigator.onLine;
    if (isOnline) {
      this.isLoading = true;
      this._userService.getUserDetails(this.userId).subscribe((user: any) => {
        this.user = user.data;
        this.isLoading = false;
      })
    } else {
      this.users = this._userService.getUsers();
      this.updateUserDetails();
    }
  }

  backClicked() {
    this._location.back();
  }
}
