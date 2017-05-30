import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [AppComponent],
    imports:      [BrowserModule, ModalModule.forRoot()],
    bootstrap:    [AppComponent],
})
export class AppModule {}