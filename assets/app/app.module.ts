import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

@NgModule({
    declarations: [
        AppComponent,
        NAV_DROPDOWN_DIRECTIVES ],
    imports:      [BrowserModule, ModalModule.forRoot(), BsDropdownModule.forRoot()],
    bootstrap:    [AppComponent],
})
export class AppModule {}