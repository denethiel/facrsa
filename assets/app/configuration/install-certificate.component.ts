import {Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators,
         AbstractControl } from '@angular/forms';

@Component({
  selector:'install-certificate',
  templateUrl:'app/configuration/install-certificate.component.html'
})
export class InstallCertificateComponent implements OnInit {
  installCertificateForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  createForm():void{
    this.installCertificateForm = this.fb.group({
      'cerFile':[''],
      'keyFile':[''],
      'password':['']
    })
  }

  ngOnInit():void{
    this.createForm();
  }
}
