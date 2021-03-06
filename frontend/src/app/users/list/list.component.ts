import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

import { UserService } from '../user.service';

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  goToUser(action: string, userName: string): void {
    this.router.navigate(['../', action, userName], { relativeTo: this.route });
  }

  deleteUser(userName: string): void {
    if (confirm(`Are you sure to delete User: ${userName} ?`)) {
      this.userService.deleteUser(userName).subscribe(
        (response: any) => {
          if (response.message) {
            this.ngFlashMessageService.showFlashMessage({
              messages: [response.message],
              type: 'success',
              dismissible: true,
              timeout: 5000
            });
            this.users = this.users.filter(u => u !== userName);
          }
        }
      );
    }
  }

}
