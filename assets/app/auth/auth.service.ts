import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSUbject';
import { tokenNotExpired } from 'angular2-jwt';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

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
                localStorage.setItem('user',JSON.parse(data).user)
                localStorage.setItem('auth_token', JSON.parse(data).token);
                this.router.navigate(['/']);
                this.setLoggedIn(true);     
    }

    logout(){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
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

export function authHttpServiceFactory(http: Http, options: RequestOptions){
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
                   tokenGetter: (() => sessionStorage.getItem('auth_token')),
                   globalHeaders: [{'Content-Type':'application/json'}],
    }), http, options);
}