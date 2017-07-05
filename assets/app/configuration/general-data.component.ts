import {Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators,
         AbstractControl } from '@angular/forms';
import {ValidationService} from '../pages/validation.service';
import {AuthService} from '../auth/auth.service';

@Component({
    selector:'general-data',
    templateUrl:'app/configuration/general-data.component.html'
})
export class GeneralDataComponent implements OnInit {

    generalDataForm: FormGroup;

    name: AbstractControl;
    rfc: AbstractControl;
    web: AbstractControl;
    gln: AbstractControl;
    street: AbstractControl;
    num_ext: AbstractControl;
    num_int: AbstractControl;
    reference: AbstractControl;
    colony: AbstractControl;
    postal_code: AbstractControl;
    location: AbstractControl;
    city: AbstractControl;
    state: AbstractControl;
    country: AbstractControl;


    is_edit : boolean = false;
    constructor(private fb: FormBuilder, private auth:AuthService ) {}

    isDisabled():boolean{
        return this.is_edit;
    }
    edit():void{
        this.is_edit = true;
    }

    createForm():void{

    }
    ngOnInit():void{
        this.createForm();
    }
}