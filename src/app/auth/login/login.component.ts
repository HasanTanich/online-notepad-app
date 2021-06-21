import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/delay';
import { AuthenticationService } from 'src/app/core/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticationService, Title]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;
    loading: boolean;
    email: string;
    password: string;

    constructor(private router: Router,
        private titleService: Title,
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

        this.authenticationService.login(this.email, this.password);
        this.email = '';
        this.password = '';
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
