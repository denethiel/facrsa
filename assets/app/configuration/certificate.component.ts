import {Component, OnInit} from '@angular/core';
import {CertificateService} from '../shared/certificate.service';
import {Certificate }from '../shared/models';
import {Observable} from 'rxjs';

@Component({
    selector:'certificate',
    templateUrl:'./certificate.component.html'
})
export class CertificateComponent implements OnInit{

    certificates: Observable<any>;

    constructor(private cerService: CertificateService) {
      this.certificates = this.cerService.certificates;
      // this.cerService.certificates.subscribe(certificate => {
      //   this.certificates = certificate;
      //   console.log(this.certificates);
      // })
    }

    haveItems():boolean{
      console.log(this.cerService.numberOfCertificates);
      if( this.cerService.numberOfCertificates === 0){
        return false;
      }else{
        return true;
      }
    }

    delete(certificate: Certificate){
      this.cerService.deleteCertificate(certificate);
    }

    get size() {
      return this.cerService.certificates.map((certificates:Certificate[]) => certificates.length)
    }



    ngOnInit():void{
        // this.cerService.certificates
        // .subscribe(
        //     (certificates:Certificate[])=>{
        //         this.certificates;
        //     }
        // )
    }
}
