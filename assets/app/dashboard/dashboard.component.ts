import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'app/dashboard/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    constructor( private router: Router) {}

    ngOnInit():void {
        
    }
}