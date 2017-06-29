import {NgModule} from '@angular/core';

import { TabsModule } from 'ngx-bootstrap';

import { ConfigurationComponent } from './configuration.component';
import {GeneralDataComponent} from './general-data.component'
import { ConfigurationRoutingModule } from './configuration-routing.module';

@NgModule({
    imports:[ConfigurationRoutingModule,TabsModule.forRoot()],
    declarations:[ConfigurationComponent, GeneralDataComponent]
})
export class ConfigurationModule {}