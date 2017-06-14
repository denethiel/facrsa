import { Component } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators} from '@angular/forms';

@Component({
    templateUrl:'app/pages/login.component.html'
})
export class LoginComponent{
    loginForm: FormGroup;
    constructor(fb: FormBuilder) {
        this.loginForm = fb.group({
            'email':['', Validators.compose([Validators.required, Validators.email]) ],
            'password':['',Validators.required]
        })
     }
     
     onsubmit(value:any):void{
         console.log('you submitted value:' , value);
     }
}