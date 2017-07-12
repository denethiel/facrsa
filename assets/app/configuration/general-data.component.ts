import {Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators,
         AbstractControl } from '@angular/forms';
import {ValidationService} from '../pages/validation.service';
import {UserService} from '../shared/user.service';
import {User, Address} from '../shared/models';

@Component({
    selector:'general-data',
    templateUrl:'app/configuration/general-data.component.html'
})
export class GeneralDataComponent implements OnInit {

    generalDataForm: FormGroup;
    currentUser: User;

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
    email: AbstractControl;
    telephone: AbstractControl;
    fax: AbstractControl;

    editMode : boolean = false;
    constructor(private fb: FormBuilder, private userService: UserService ) {

    }

    isDisabled():boolean{
        return !this.editMode;
    }
    edit():void{
        this.editMode = true;
    }

    save():void{
        this.editMode = false;
        this.userService.saveGeneralData(this.generalDataForm.value);
    }

    createForm():void{

        this.generalDataForm = this.fb.group({
            'id':[this.currentUser.id],
            'name':[this.currentUser.name],
            'rfc':[(this.currentUser.rfc != undefined)?this.currentUser.rfc:''],
            'web':[(this.currentUser.web != undefined)?this.currentUser.web:''],
            'gln':[(this.currentUser.gln != undefined)?this.currentUser.gln:''],
            'street':[(this.currentUser.address != undefined)?this.currentUser.address.street:''],
            'num_ext':[(this.currentUser.address != undefined)?this.currentUser.address.num_ext:''],
            'num_int':[(this.currentUser.address != undefined)?this.currentUser.address.num_int:''],
            'reference':[(this.currentUser.address != undefined)? this.currentUser.address.reference:''],
            'colony':[(this.currentUser.address != undefined)?this.currentUser.address.colony:''],
            'location':[(this.currentUser.address != undefined)?this.currentUser.address.location:''],
            'city':[(this.currentUser.address != undefined)?this.currentUser.address.city:''],
            'postal_code':[(this.currentUser.address != undefined)?this.currentUser.address.postal_code:''],
            'state':[(this.currentUser.address != undefined)?this.currentUser.address.state:''],
            'country':[(this.currentUser.address != undefined)?this.currentUser.address.country:''],
            'email':[(this.currentUser.email != undefined)?this.currentUser.email:''],
            'telephone':[(this.currentUser.telephone != undefined)?this.currentUser.telephone:''],
            'fax':[(this.currentUser.fax != undefined)?this.currentUser.fax:'']

        });
        this.name = this.generalDataForm.controls['name'];
        this.rfc = this.generalDataForm.controls['rfc'];
        this.web = this.generalDataForm.controls['web'];
        this.gln = this.generalDataForm.controls['gln'];
        this.street = this.generalDataForm.controls['street'];
        this.num_ext = this.generalDataForm.controls['num_ext'];
        this.num_int = this.generalDataForm.controls['num_int'];
        this.reference = this.generalDataForm.controls['reference'];
        this.colony = this.generalDataForm.controls['colony'];
        this.location = this.generalDataForm.controls['location'];
        this.city = this.generalDataForm.controls['city'];
        this.postal_code = this.generalDataForm.controls['postal_code'];
        this.state = this.generalDataForm.controls['state'];
        this.country = this.generalDataForm.controls['country'];
        this.email = this.generalDataForm.controls['email'];
        this.telephone = this.generalDataForm.controls['telephone'];
        this.fax = this.generalDataForm.controls['fax'];
    }
    ngOnInit():void{
        this.userService.currentUser
            .subscribe(
                (user: User) => {
                    this.currentUser = user;
                    //console.log(this.currentUser);
                }
            )
        this.createForm();
    }
}
