import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

// import {SailsService} from "angular2-sails/dist/index";
// import {SailsMessageService} from "./services/SailsMessage.Service";


@NgModule({
    declarations: [AppComponent],
    imports:      [BrowserModule],
    bootstrap:    [AppComponent],
    // providers: [SailsMessageService, SailsService]
})
export class AppModule{


}
