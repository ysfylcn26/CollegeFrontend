import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {HomeComponent} from './component/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertComponent } from './component/alert/alert.component';

@NgModule({
    declarations: [
        MainComponent,
        SignInComponent,
        SignUpComponent,
        HomeComponent,
        AlertComponent
    ],
    exports: [
        MainComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MainModule {
}
