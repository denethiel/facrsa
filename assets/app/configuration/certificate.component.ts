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