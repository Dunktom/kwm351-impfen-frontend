import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../shared/user';
import { UserStoreService } from '../shared/user-store.service';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'impfen-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];
  @Output() showDetailsEvent = new EventEmitter<User>();

  constructor(
    private ls: UserStoreService,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.ls.getAll().subscribe(res => (this.users = res));
  }
}
