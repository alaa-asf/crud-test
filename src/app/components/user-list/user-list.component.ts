import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userService } from 'src/app/services/user.service';
import { setUsers } from 'src/app/store/user.actions';
import { AppState } from 'src/app/store/user.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any = [];
  usersToShow: any = [];
  length: number = 0;
  pageIndex: number = 0;
  showFirstLastButtons: boolean = true;
  pageSizeOptions: any[] = [2, 4, 6];
  firstLoad: boolean = false;
  isLoading: boolean = true;
  constructor(private _userService: userService, private store: Store<AppState>) {
  }

  ngOnInit() {
    if (!this.firstLoad) {
      this.getAllUsers(1);
      this.firstLoad = true;
    }
  }

  // here i call the api to get the all users found in the api
  // i know it's pagination api but i do that for caching mechanisms
  // i create flag to don't call the api twice and i get the users from local storage if i find it
  getAllUsers(pageNum: number) {
    const isOnline = navigator.onLine;
    //check the connection status and call appropriate function to fetch data
    if (isOnline) {
      this._userService.getAllUsers(pageNum).subscribe((users: any) => {
        this.users = [...this.users, ...users.data];
        this.length = users.total;
        this.pageIndex = users.page;
        if (this.pageIndex < users.total_pages) {
          this.getAllUsers(this.pageIndex + 1);
        } else {
          this._userService.setUsers(this.users);
          this.handlePageEvent({ pageIndex: 0, pageSize: this.pageSizeOptions[0] });
          this.isLoading = false;
        }
        this.store.dispatch(setUsers({ users }));
      });
    } else {
      //here i get the users from local storage if found
      const cachedUsers = this._userService.getUsers();
      if (cachedUsers.length > 0) {
        this.users = cachedUsers;
        this.length = this.users.length;
        this.pageIndex = 1;
      } else {
        console.error('No cached users found in local storage.');
      }
    }

  }

  // to handle the actions of paginator
  handlePageEvent(event: any) {
    this.isLoading = true;
    this.pageIndex = event.pageIndex;
    let startIndex = this.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.usersToShow = this.users.slice(startIndex, endIndex);
    this.isLoading = false;
  }
}
