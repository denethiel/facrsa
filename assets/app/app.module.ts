import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent }   from './app.component';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { NAV_MENU_DIRECTIVES } from './shared/nav-menu.directive';

//Rutas
import { AppRoutingModule } from './app.routing';
 
// Templates
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent  } from './layouts/simple-layout.component';
 

@NgModule({
    imports:[
        BrowserModule,
        //BrowserAnimationsModule,
        AppRoutingModule, 
        ModalModule.forRoot(), 
        BsDropdownModule.forRoot()],
    declarations: [
        AppComponent,
        FullLayoutComponent,
        SimpleLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        NAV_MENU_DIRECTIVES ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }],
    bootstrap:    [AppComponent],
})
export class AppModule {}