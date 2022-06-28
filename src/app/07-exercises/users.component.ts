import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  template: '',
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(private _service: UserService) {}

  ngOnInit() {
    this._service.getUsers().subscribe((users) => (this.users = users));
  }

  deleteUser(user) {
    if (confirm('Are you sure you want to delete ' + user + '?')) {
      var index = this.users.indexOf(user);
      this.users.splice(index, 1);

      this._service.deleteUser(user).subscribe({
        next: noop,
        error: () => {
          alert('Could not delete the user.');
          this.users.splice(index, 0, user);
        },
      });
    }
  }
}
