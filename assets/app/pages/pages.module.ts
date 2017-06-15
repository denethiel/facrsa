import { NgModule } from '@angular/core';
//import {FormsModule} from '@angular/forms';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    imports: [PagesRoutingModule, ReactiveFormsModule ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class PagesModule {}