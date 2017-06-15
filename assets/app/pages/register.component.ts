import { Component, OnInit} from '@angular/core';

import { FormBuilder,
         FormGroup,
         Validators} from '@angular/forms';

@Component({
    templateUrl:'app/pages/register.component.html'
})
export class RegisterComponent{

    registerForm: FormGroup;
    constructor(private fb: FormBuilder) { }

    createForm():void{
        this.registerForm = this.fb.group({
            'email':[''],
            'password':[''],
            'confirmPassword':['']
        });
    }

    ngOnInit(): void{
        this.createForm();
    }

    onSubmit(value:any):void{
        console.log('you sub:' + value );
    }
}