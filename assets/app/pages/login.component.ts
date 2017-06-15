import { Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators} from '@angular/forms';

@Component({
    templateUrl:'app/pages/login.component.html'
})
export class LoginComponent implements OnInit{

    loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
     }



     createForm():void{
         this.loginForm = this.fb.group({
             'email': [''],
             'password':['']
         });
     }

     ngOnInit(): void{
         this.createForm();
     }
     
     onSubmit(value:any):void{
         console.log('you submitted value:' , value);
     }
}