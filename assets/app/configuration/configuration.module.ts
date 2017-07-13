import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule, ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


import { ConfigurationComponent } from './configuration.component';
import {GeneralDataComponent} from './general-data.component'
import {BranchComponent} from './branch.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import {InstallCertificateComponent} from './install-certificate.component';

@NgModule({
    imports:[ConfigurationRoutingModule,TabsModule.forRoot(), ModalModule.forRoot(),CommonModule, ReactiveFormsModule],
    declarations:[ConfigurationComponent, GeneralDataComponent, BranchComponent, InstallCertificateComponent]
})
export class ConfigurationModule {}
