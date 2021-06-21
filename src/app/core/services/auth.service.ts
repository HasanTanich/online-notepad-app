import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/delay';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    isLoggedIn = false;

    constructor(private router: Router, public firebaseAuth: AngularFireAuth, public db: AngularFirestore, public notify: NotificationService) { }

    login(email: string, password: string) {
        this.firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res));
                this.isLoggedIn = true;
                this.notify.openSnackBar("Welcome");
                this.router.navigate(['/my-notes']);
            }).catch(err => {
                alert('something is wrong:' + err.message);
            });
    }

    signup(email: string, password: string) {
        this.firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                return this.db.collection('users').doc(res.user.uid).set({
                    notes : [
                    ]
                });
            }).then( (res) => {
                console.log(res);
                alert('Registration successful, you can log in now');
            }).catch(err => {
                alert('something is wrong: ' + err.message);
            });
    }

    logout(): void {
        localStorage.clear();
    }

    getCurrentUser(): any {
        let user = JSON.parse(localStorage.getItem("user"));
        return {
            token: localStorage.user.refreshToken,
            isAdmin: true,
            email: user.user.email,
            uid: user.user.uid,
            expiration: moment().add(1, 'days').toDate(),
            fullName: user.user.email,
        };
    }

    passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }
}
