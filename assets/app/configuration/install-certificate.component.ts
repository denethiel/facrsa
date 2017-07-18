import {Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators,
         AbstractControl } from '@angular/forms';
 import { NgForm } from '@angular/forms';

import {UserService} from '../shared/user.service';

@Component({
  selector:'install-certificate',
  templateUrl:'app/configuration/install-certificate.component.html'
})
export class InstallCertificateComponent implements OnInit {

  @ViewChild("cerFile") cerFile:any;
  @ViewChild("keyFile") keyFile:any;

  constructor(private userService: UserService) {}

  ngOnInit():void{
  }
  onSubmit(value:any){
    console.log(value);
    let cerFiles = this.cerFile.nativeElement;
    let keyFiles = this.keyFile.nativeElement;
    if(cerFiles.files && cerFiles.files[0] && keyFiles.files && keyFiles.files[0]){
      let cerFileToUpload = cerFiles.files[0];
      let keyFilesToUpload = keyFiles.files[0];
      let uploadData = {
        'cerFile':cerFileToUpload,
        'keyFile':keyFilesToUpload,
        'password':value.password
      }
      console.log(uploadData);
      console.log(cerFileToUpload);
      this.userService.uploadCertificate(uploadData);
    }

  }
}
