import { Component, OnInit} from '@angular/core';
import { User } from '../models/User';
import { UsersService } from '../services/Users/users.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent  implements OnInit{
  users!: User[];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
