import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from "./modules/layout/layout.module";
import {HomeModule} from "./modules/home/home.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TokenInterceptor} from "./modules/auth/tokeninterceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        HomeModule,
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        }
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
