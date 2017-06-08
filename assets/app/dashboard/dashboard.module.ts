import { NgModule } from '@angular/core';
//Importar lo que se valla a ocupar

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports:[DashboardRoutingModule],
    declarations:[ DashboardComponent]
})
export class DashboardModule {}