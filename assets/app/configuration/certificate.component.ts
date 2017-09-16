import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {CertificateService} from '../shared/certificate.service';
import {Certificate }from '../shared/models';
import {Observable} from 'rxjs';

@Component({
    selector:'certificate',
    templateUrl:'./certificate.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class CertificateComponent implements OnInit{

    certificates: Certificate[];

    constructor(private cerService: CertificateService, private _changeDetector: ChangeDetectorRef) {
      // this.cerService.certificates.subscribe(certificate => {
      //   this.certificates = certificate;
      //   console.log(this.certificates);
      // })
    }

    haveItems():boolean{
      if(this.certificates != undefined && this.certificates.length != 0){
        return true;
      }else{
        return false;
      }
    }

    delete(certificate: Certificate){
      this.cerService.deleteCertificate(certificate);
    }

    ngOnInit():void{
         this.cerService.certificates.subscribe((certificates:Certificate[]) => {
             this.certificates = certificates;
             this._changeDetector.detectChanges();
         })
    }
}
