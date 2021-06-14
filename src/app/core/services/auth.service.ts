import { Injectable, Inject } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/delay';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    isLoggedIn = false;

    constructor(private router: Router, public firebaseAuth: AngularFireAuth, public afs: AngularFirestore, public notify: NotificationService) { }

    login(email: string, password: string) {
        this.firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res)
                localStorage.setItem('user', JSON.stringify(res));
                this.isLoggedIn = true;
                this.notify.openSnackBar("Welcome");
                this.router.navigate(['/my-notes']);
            }).catch(err => {
                alert('something is wrong:' + err.message);
            });
        // set token property
        // const decodedToken = jwt_decode(response['token']);

        // store email and jwt token in local storage to keep user logged in between page refreshes
        // this.localStorage.setItem('currentUser', JSON.stringify({
        //     token: 'aisdnaksjdn,axmnczm',
        //     isAdmin: true,
        //     email: 'john.doe@gmail.com',
        //     id: '12312323232',
        //     alias: 'john.doe@gmail.com'.split('@')[0],
        //     expiration: moment().add(1, 'days').toDate(),
        //     fullName: 'John Doe'
        // }));
    }

    signup(email: string, password: string) {
        this.firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                alert('Registration successful, you can log in now');
                this.router.navigate(['/login']);
                // localStorage.setItem('user', JSON.stringify(res.user));
                console.log(res);
            }).catch(err => {
                alert('something is wrong: ' + err.message);
            });
    }

    logout(): void {
        localStorage.removeItem('user');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        // return JSON.parse(this.localStorage.getItem('currentUser'));

        return {
            token: localStorage.user.refreshToken,
            isAdmin: true,
            email: localStorage.user.email,
            uid: localStorage.user.email,
            // alias: localStorage.user.email.split('@')[0],
            expiration: moment().add(1, 'days').toDate(),
            fullName: 'Mahadi Babiker',
        };
    }

    passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).delay(1000);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }
}
