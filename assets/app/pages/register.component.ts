import { Component, OnInit} from '@angular/core';

import { FormBuilder,
         FormGroup,
         Validators, AbstractControl} from '@angular/forms';

export class PasswordValidation{
    static MatchPassword(AC: AbstractControl):any{
        let password = AC.get('password').value;
        let confirmPassword = AC.get('confirmPassword').value;
        if(password != confirmPassword){
            console.log('false');
            AC.get('confirmPassword').setErrors({MatchPassword: true})
        }else{
            console.log('true');
            return null;
        }

    }
}

@Component({
    templateUrl:'app/pages/register.component.html'
})
export class RegisterComponent{

    registerForm: FormGroup;

    email: AbstractControl;
    password: AbstractControl;
    confirmPassword : AbstractControl;
    conditions: AbstractControl;

    constructor(private fb: FormBuilder) { }

    createForm():void{
        this.registerForm = this.fb.group({
            'email':['', Validators.required],
            'password':['', Validators.required],
            'confirmPassword':['', Validators.required],
            'conditions':[false]
        },{
            validator: PasswordValidation.MatchPassword
        });
        this.email = this.registerForm.controls['email'];
        this.password = this.registerForm.controls['password'];
        this.confirmPassword = this.registerForm.controls['confirmPassword'];
        this.conditions = this.registerForm.controls['conditions'];
    }

    ngOnInit(): void{
        this.createForm();
    }

    onSubmit(value:any):void{
        console.log('you sub:' + value );
    }
}