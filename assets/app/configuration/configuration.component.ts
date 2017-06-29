import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
    templateUrl: 'app/configuration/configuration.component.html'
})
export class ConfigurationComponent implements OnInit {
    constructor( private router: Router) {}

    ngOnInit():void {
        
    }
}