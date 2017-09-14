import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthService, authHttpServiceFactory } from './auth/auth.service';
import {UserService} from './shared/user.service';
import { AuthGuard } from './auth/auth-guard.service';
import {CertificateService} from './shared/certificate.service';
import { MessagesService} from './shared/messages.service';

import { AppComponent }   from './app.component';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { NAV_MENU_DIRECTIVES } from './shared/nav-menu.directive';

//Rutas
import { AppRoutingModule } from './app.routing';

// Templates
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent  } from './layouts/simple-layout.component';

// Auth Request
import { Http, RequestOptions  } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

//File Uploads
import {Uploader} from 'angular2-http-file-upload';

@NgModule({
    imports:[
        BrowserModule,
        //BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
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
        useClass: HashLocationStrategy,
    },
    {provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps:[Http, RequestOptions]
    },
    AUTH_PROVIDERS,
    AuthService,
    UserService,
    CertificateService,
    MessagesService,
    Uploader,
    AuthGuard],
    bootstrap:    [AppComponent],
})
export class AppModule {}
