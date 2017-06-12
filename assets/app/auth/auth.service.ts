import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSUbject';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http } from '@angular/http';

class User {
    id: number;
    email: string;
}
@Injectable()
export class AuthService {
    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(private router: Router, private _http: Http){
        if(this.authenticated){
            this.setLoggedIn(true);
        }
    }

    login(credentials:any){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http
            .post('/auth/authenticate',JSON.stringify(credentials),{headers})
            .subscribe(response => {
                let data = response.json();
                localStorage.setItem('auth_token', JSON.stringify(data));
                this.setLoggedIn(true);
            })
    }

    register(formData:any){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        localStorage.removeItem('auth_token');
        this.setLoggedIn(false);
        this._http
            .post('/auth/register',JSON.stringify(formData),{headers})
            .subscribe(
                response => {
                    let data = response.json();
                    localStorage.setItem('auth_token', JSON.stringify(data))
                    this.setLoggedIn(true);
                }
            )
    }

    logout(){
        localStorage.removeItem('auth_token');
        this.router.navigate(['/']);
        this.setLoggedIn(false);
    }

    setLoggedIn(value: boolean){
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }

    get authenticated() {
        return tokenNotExpired('auth_token');
    }
}