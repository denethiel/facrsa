import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
//import {FormsModule} from '@angular/forms';

import { LoginComponent } from './login.component';
import { REGISTER_COMPONENTS } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

import {ValidationService} from './validation.service'

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    imports: [PagesRoutingModule, ReactiveFormsModule, CommonModule ],
    declarations: [
        LoginComponent,
        REGISTER_COMPONENTS
    ],
    providers:[ValidationService]
})
export class PagesModule {}