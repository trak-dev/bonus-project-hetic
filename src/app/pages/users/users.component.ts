import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: number = 0;

  constructor(
    private Users: UsersService,
    private Global: GlobalService
    ) { }

  async ngOnInit() {
    this.users = await this.Users.getUsers();
    this.Global.users = this.users;
  }

  async setCurrentUser() {
    this.Global.user = await this.Users.getUser(this.selectedUser);
  }

}
