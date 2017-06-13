import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    imports: [PagesRoutingModule ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class PagesModule {}