import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainModule} from './_Layout/main/main.module';
import {HeaderComponent} from './_Layout/haeder/header.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MainModule,
        FormsModule,
        ReactiveFormsModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
