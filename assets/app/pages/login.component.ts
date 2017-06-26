import { Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators,
         AbstractControl } from '@angular/forms';

import {ValidationService} from './validation.service';

@Component({
    templateUrl:'app/pages/login.component.html'
})
export class LoginComponent implements OnInit{

    loginForm: FormGroup;

    email: AbstractControl;
    password: AbstractControl;
    remember: AbstractControl;

    constructor(private fb: FormBuilder) {
     }



     createForm():void{
         this.loginForm = this.fb.group({
             'email': ['',[Validators.required, ValidationService.emailValidator]],
             'password':['',[Validators.required, ValidationService.passwordValidator]],
             'remember':['']
         });

         this.email = this.loginForm.controls['email'];
         this.password = this.loginForm.controls['password'];
         this.remember = this.loginForm.controls['remember'];
     }

     ngOnInit(): void{
         this.createForm();
     }
     
     onSubmit(value:any):void{
         console.log('you submitted value:' , value);
     }
}