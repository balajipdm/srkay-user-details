import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'users-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  addForm: FormGroup;
  userName = null;
  fAction = 'Add';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern('^[a-z0-9_-]{3,15}$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
    });
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userName = params.userName;
          if(this.userName) {
            this.populateUser();
          }          
        }
      );
  }

  ngOnDestroy() {
    this.userName = null;
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.userService.saveUser(this.addForm.value, this.userName)
      .subscribe(
        (response: any) => {
          if (response.message) {
            this.ngFlashMessageService.showFlashMessage({
              messages: [response.message],
              type: 'success'
            });
            this.router.navigate(['/users/list'], { relativeTo: this.route });
          }
        },
        (error) => {
          this.ngFlashMessageService.showFlashMessage({
            messages: [error.error.message],
            type: 'danger'
          });
        }
      );      
  }

  private populateUser() {
    this.fAction = 'Edit';
    this.userService.getUser(this.userName).subscribe(
      (user) => {
        this.addForm.patchValue({
          ...user
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
