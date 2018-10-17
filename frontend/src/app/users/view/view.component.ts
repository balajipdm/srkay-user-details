import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'users-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService    
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.subscription = this.userService.getUser(params.userName).subscribe(
            (user) => {
              this.user = user;            
            }
          );
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
