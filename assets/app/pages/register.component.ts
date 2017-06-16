import { Component, OnInit} from '@angular/core';

import { FormBuilder,
         FormGroup,
         Validators, AbstractControl} from '@angular/forms';

@Component({
    templateUrl:'app/pages/register.component.html'
})
export class RegisterComponent{

    registerForm: FormGroup;

    email: AbstractControl;
    password: AbstractControl;
    confirmPassword : AbstractControl;

    constructor(private fb: FormBuilder) { }

    createForm():void{
        this.registerForm = this.fb.group({
            'email':['', Validators.required],
            'password':['', Validators.required],
            'confirmPassword':['', Validators.required]
        });
        this.email = this.registerForm.controls['email'];
        this.password = this.registerForm.controls['password'];
        this.confirmPassword = this.registerForm.controls['confirmPassword'];
    }

    ngOnInit(): void{
        this.createForm();
    }

    onSubmit(value:any):void{
        console.log('you sub:' + value );
    }
}