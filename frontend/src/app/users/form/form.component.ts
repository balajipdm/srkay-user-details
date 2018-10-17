import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'users-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
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
    this.buildForm();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userName = params.userName;
          if (this.userName) {
            this.populateUser();
          }
        }
      );
  }

  ngOnDestroy() {
    this.userName = null;
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.userService.saveUser(this.userForm.value, this.userName).subscribe(
        (response: any) => {
          if (response.message) {
            this.ngFlashMessageService.showFlashMessage({
              messages: [response.message],
              type: 'success',
              dismissible: true,
              timeout: 5000
            });
            this.router.navigate(['/users/list']);
          }
        }
      );
  }

  private buildForm() {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern('^[a-z0-9_-]{3,15}$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
    });
  }

  private populateUser() {
    this.fAction = 'Edit';
    this.userService.getUser(this.userName).subscribe(
      (user) => {
        this.userForm.patchValue({
          ...user
        });
      }
    );
  }

}
