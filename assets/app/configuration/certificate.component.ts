import {Component, OnInit} from '@angular/core';
import {CertificateService} from '../shared/certificate.service';
import {Certificate }from '../shared/models';

@Component({
    selector:'certificate',
    templateUrl:'./certificate.component.html'
})
export class CertificateComponent implements OnInit{

    certificates: Certificate[];

    constructor(private cerService: CertificateService) {}

    haveItems():boolean{
      if(this.certificates != undefined && this.certificates.length != 0){
        return true;
      }else{
        return false;
      }
    }

    ngOnInit():void{
        this.cerService.certificates
        .subscribe(
            (certificates:Certificate[])=>{
                this.certificates = certificates;
            }
        )
    }
}
