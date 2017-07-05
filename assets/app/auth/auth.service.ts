import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSUbject';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import {Address, User} from '../shared/models';
import {UserService} from '../shared/user.service';


@Injectable()
export class AuthService {
    currentUser: User;
    currentUser$ = new BehaviorSubject<User>(this.currentUser);
    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(private router: Router, private _http: Http, private userService: UserService){
        if(this.authenticated){
            this.setLoggedIn(true);
            this.userService.setCurrentUser(<User>JSON.parse(localStorage.getItem('user')))
        }
    }

    login(credentials:any){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http
            .post('/auth/authenticate',JSON.stringify(credentials),{headers})
            .subscribe(response => {
                this._handleData(response);
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
                    this._handleData(response);
                },error => {
                    console.log(error);
                }
            )
    }

    _handleData(response:any){
        let data = JSON.stringify(response.json());
            
                localStorage.setItem('user',JSON.stringify(JSON.parse(data).user));
                localStorage.setItem('auth_token', JSON.parse(data).token);
                this.router.navigate(['/']);
                //console.log(JSON.parse(data).user);
                this.userService.setCurrentUser(<User>JSON.parse(data).user)
                this.setLoggedIn(true);     
    }

    logout(){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.setLoggedIn(false);
        this.router.navigate(['/pages/login']);
    }

    setLoggedIn(value: boolean){
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }

    get authenticated() {
        return tokenNotExpired('auth_token');
    }
}

export function authHttpServiceFactory(http: Http, options: RequestOptions){
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
                   tokenGetter: (() => sessionStorage.getItem('auth_token')),
                   globalHeaders: [{'Content-Type':'application/json'}],
    }), http, options);
}