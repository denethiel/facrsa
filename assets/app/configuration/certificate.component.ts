import {Component, OnInit} from '@angular/core';
import {CertificateService} from '../shared/certificate.service';

@Component({
    selector:'certificate',
    templateUrl:'app/configuration/certificate.component.html'
})
export class CertificateComponent implements OnInit{

    constructor(private cerService: CertificateService) {}
    
    ngOnInit():void{
        this.cerService.certificates$
        .subscribe(
            (certificates:any)=>{
                console.log(certificates);
            }
        )
    }
}