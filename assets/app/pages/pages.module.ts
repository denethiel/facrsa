import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
//import {FormsModule} from '@angular/forms';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    imports: [PagesRoutingModule, ReactiveFormsModule, CommonModule ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class PagesModule {}