import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
    templateUrl: './configuration.component.html'
})
export class ConfigurationComponent implements OnInit {
    company:boolean = false;
    folio:boolean = false;
    parameters:boolean = false;
    users:boolean = false;

    constructor( private router: Router) {}

    ngOnInit():void {
        this.company = true;
    }
    _reset():void{
        this.company = false;
        this.folio = false;
        this.parameters = false;
        this.users = false;
    }
    show(value:string):void{
        switch(value){
            case 'company':{
                this._reset();
                this.company = true;
                break;
            }
            case 'folio':{
                this._reset();
                this.folio = true;
                break;
            }
            case 'parameters':{
                this._reset();
                this.parameters = true;
                break;
            }
            case 'users':{
                this._reset();
                this.users = true;
                break;
            }
            default:{
                console.log("Default");
            }
        }
    }
}
