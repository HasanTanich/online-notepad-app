import { NotificationService } from './../../core/services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { SpinnerService } from './../../core/services/spinner.service';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [SpinnerService, NotificationService]
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  disableSubmit: boolean;

  constructor(
    private spinnerService: SpinnerService,
    private notificationService: NotificationService,
    private firebase: FirebaseApp,
    public router : Router) {

    this.hideCurrentPassword = true;
    this.hideNewPassword = true;
  }

  ngOnInit() {
    this.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      newPasswordConfirm: new FormControl('', Validators.required),
    });

    this.form.get('currentPassword').valueChanges
      .subscribe(val => { this.currentPassword = val; });

    this.form.get('newPassword').valueChanges
      .subscribe(val => { this.newPassword = val; });

    this.form.get('newPasswordConfirm').valueChanges
      .subscribe(val => { this.newPasswordConfirm = val; });

    this.spinnerService.visibility.subscribe((value) => {
      this.disableSubmit = value;
    });
  }

  changePassword() {

    if (this.newPassword !== this.newPasswordConfirm) {
      this.notificationService.openSnackBar('New passwords do not match.');
      return;
    }

    const user = this.firebase.auth().currentUser;
    console.log(user);

    user.updatePassword (this.newPassword)
      .then(
        () => {
          this.form.reset();
          this.notificationService.openSnackBar('Your password has been changed.');
          this.router.navigate(['/my-notes']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
