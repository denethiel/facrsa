import {Component, OnInit} from '@angular/core';
import {CertificateService} from '../shared/certificate.service';
import {Certificate }from '../shared/models';

@Component({
    selector:'certificate',
    templateUrl:'app/configuration/certificate.component.html'
})
export class CertificateComponent implements OnInit{

    certificates: Certificate[];

    constructor(private cerService: CertificateService) {}

    haveItems():boolean{
        console.log(this.certificates);
      if(this.certificates != undefined && this.certificates.length != 0){
        console.log("Contiene Items");
        return true;
      }else{
        console.log("No tiene items");
        return false;
      }
    }

    ngOnInit():void{
        this.cerService.certificates
        .subscribe(
            (certificates:Certificate[])=>{
                this.certificates = certificates;
                console.log(this.certificates);
            }
        )
    }
}
