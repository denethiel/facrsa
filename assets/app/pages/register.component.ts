import { Component, OnInit, Input} from '@angular/core';

import {ValidationService} from './validation.service';

import {AuthService} from '../auth/auth.service';

import { FormBuilder,
         FormGroup,
         Validators, AbstractControl, FormControl} from '@angular/forms';

export class RegisterValidators{
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

    /*static AcceptConditions(AC: AbstractControl):any{
        let conditions = AC.get('conditions').value;
        if(!conditions){
            AC.get('conditions').setErrors({AcceptConditions: true})
        }else{
            return null;
        }
    }*/
}

@Component({
    selector: 'error-messages',
    template:`
        <li *ngIf="errorMessage !== null">{{errorMessage}}</li>
    `
})
export class ErrorMessages {
    //xerrorMessage: string;
    @Input() control: FormControl;
    constructor() {}

    get errorMessage(){
        for(let propertyName in this.control.errors){
            if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
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

    constructor(private fb: FormBuilder, private auth: AuthService) { }

    createForm():void{
        this.registerForm = this.fb.group({
            'email':['', [Validators.required, ValidationService.emailValidator]],
            'password':['', [Validators.required, ValidationService.passwordValidator]],
            'confirmPassword':['', [Validators.required, ValidationService.passwordValidator]],
            'conditions':['', [Validators.required, ValidationService.acceptConditions]]
        },{
            validator: RegisterValidators.MatchPassword
        });
        this.email = this.registerForm.controls['email'];
        this.password = this.registerForm.controls['password'];
        this.confirmPassword = this.registerForm.controls['confirmPassword'];
        this.conditions = this.registerForm.controls['conditions'];
    }

    ngOnInit(): void{
        this.createForm();
        console.log("Register Component Iniciado");
    }

    onSubmit(value:any):void{
        this.auth.register(value);
    }
}

export const REGISTER_COMPONENTS = [RegisterComponent, ErrorMessages];