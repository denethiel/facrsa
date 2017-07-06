import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { TabsModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfigurationComponent } from './configuration.component';
import {GeneralDataComponent} from './general-data.component'
import { ConfigurationRoutingModule } from './configuration-routing.module';

@NgModule({
    imports:[ConfigurationRoutingModule,TabsModule.forRoot(),CommonModule, ReactiveFormsModule],
    declarations:[ConfigurationComponent, GeneralDataComponent]
})
export class ConfigurationModule {}