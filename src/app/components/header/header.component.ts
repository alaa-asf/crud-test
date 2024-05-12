import { Component } from '@angular/core';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  users: any;
  user: any;
  searchInput: string = '';
  showResult: boolean = false;
  constructor(private _userService: userService) {

  }
  ngOnInit() {
    this.users = this._userService.getUsers();
  }

  searchUser() {
    if (this.searchInput.trim() == '') {
      this.showResult = false;
      return;
    }
    const userId = parseInt(this.searchInput);
    if (this.users.length > 0) {
      this.user = this.users.find((user: any) => user.id == userId) || null;
    } else {
      this._userService.getUserDetails(userId).subscribe((user: any) => {
        this.user = user.data;
      })
    }
    this.showResult = true;
  }

  closeResult() {
    this.searchInput = '';
    this.showResult = false;
  }
}
