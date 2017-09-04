import {Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators,
         AbstractControl } from '@angular/forms';
 import { NgForm } from '@angular/forms';

import {CertificateService} from '../shared/certificate.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector:'install-certificate',
  templateUrl:'./install-certificate.component.html'
})
export class InstallCertificateComponent implements OnInit {

  @ViewChild("cerFile") cerFile:any;
  @ViewChild("keyFile") keyFile:any;

  @ViewChild('cerModal') public cerModal:ModalDirective;

  constructor(private cerService: CertificateService) {}

  ngOnInit():void{
  }
  onSubmit(value:any){
    let cerFiles = this.cerFile.nativeElement;
    let keyFiles = this.keyFile.nativeElement;
    if(cerFiles.files && cerFiles.files[0] && keyFiles.files && keyFiles.files[0]){
      let cerFileToUpload = cerFiles.files[0];
      let keyFilesToUpload = keyFiles.files[0];
      this.cerService.uploadFile(cerFileToUpload).then(cerFilename =>{
        this.cerService.uploadFile(keyFilesToUpload).then(keyFilename => {
          let certificiateData = {
            'cerFile':cerFilename,
            'keyFile':keyFilename,
            'password':value.password
          }
          this.cerService.saveCertificate(certificiateData).then(certificate => {
            this.cerModal.hide();
          })
        })
      })

      let uploadData = {
        'cerFile':cerFileToUpload,
        'keyFile':keyFilesToUpload,
        'password':value.password
      }

      //this.userService.uploadCertificate(uploadData);
    }

  }
}
