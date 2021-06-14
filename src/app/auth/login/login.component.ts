import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/delay';

import { AuthenticationService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;
    loading: boolean;
    email: string;
    password: string;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('online-notepad-app - Login');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new FormGroup({
            email: new FormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl(savedUserEmail !== null)
        });

        this.registerForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        });
    }

    signUp() {
        this.email = this.registerForm.get('email').value;
        this.password = this.registerForm.get('password').value;
        this.authenticationService.signup(this.email, this.password);
        this.email = '';
        this.password = '';
    }

    signIn() {
        this.email = this.loginForm.get('email').value;
        this.password = this.loginForm.get('password').value;
        const rememberMe = this.loginForm.get('rememberMe').value;

        // if (rememberMe) {
        //     localStorage.setItem('savedUserEmail', email);
        // } else {
        //     localStorage.removeItem('savedUserEmail');
        // }
        // this.router.navigate(['/']);

        this.authenticationService.login(this.email, this.password);
        this.email = '';
        this.password = '';
    }


    // login() {
    //     const email = this.loginForm.get('email').value;
    //     const password = this.loginForm.get('password').value;
    //     const rememberMe = this.loginForm.get('rememberMe').value;

    //     this.loading = true;
    //     this.authenticationService
    //         .login(email.toLowerCase(), password)
    //         .subscribe(
    //             data => {
    //                 if (rememberMe) {
    //                     localStorage.setItem('savedUserEmail', email);
    //                 } else {
    //                     localStorage.removeItem('savedUserEmail');
    //                 }
    //                 this.router.navigate(['/']);
    //             },
    //             error => {
    //                 this.notificationService.openSnackBar(error.error);
    //                 this.loading = false;
    //             }
    //         );
    // }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
