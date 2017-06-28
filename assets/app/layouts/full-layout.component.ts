import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
    selector:'app-dashboard',
    templateUrl:'app/layouts/full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
    title: string;
    constructor(route: ActivatedRoute, private auth: AuthService) { 
        this.title = route.snapshot.data.title;
    }
    ngOnInit() : void {
       // console.log(this.route.snapshot.params);
    }

    logout(){
        this.auth.logout();
    }
}