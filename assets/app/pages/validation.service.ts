import { AbstractControl} from '@angular/forms';
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?:any){
        let config = {
            'required': 'Requerido',
            'invalidEmailAddress':'Correo Electronico Invalido',
            'invalidPassword':'Contraseña Invalido. La contraseña debe tener almenos 6 caracteres, y contener un numero.',
            'minlength': `Tamaño minimo ${validatorValue.requiredLength}`,
            'matchError': 'Contraseñas no coinciden',
            'conditionsError':'Debe aceptar los terminos y condiciones'
        };
        return config[validatorName];
    }

    static emailValidator(control: AbstractControl){
        if(control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
            return null;
        }else{
            return {'invalidEmailAddress': true};
        }
    }

    static passwordValidator(control: AbstractControl){
        // {6, 100} -- Contraseña entre 6 y 100 caracteres.
        // (?=.*[0-9]) -- Contraseña debe tener almenos un numero
        if(control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)){
            return null;
        }else{
            return {'invalidPassword': true};
        }
    }

    /*static matchPassword(control: AbstractControl){
        let password = control.get('password').value;
        let confirmPassword = control.get('confirmPassword').value;
        if(password != confirmPassword){
            //console.log('false');
            return {'matchError':true};
            //AC.get('confirmPassword').setErrors({MatchPassword: true})
        }else{
            //console.log('true');
            return null;
        }
    }*/

    static acceptConditions(control: AbstractControl){
        if(!control.value){
            return {'conditionsError':true};
        }else{
            return null;
        }
    }


}