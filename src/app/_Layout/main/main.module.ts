import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {HomeComponent} from './component/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from './component/alert/alert.component';
import {AddComponent} from './component/add/add.component';
import {authInterceptorProviders} from './_helper/auth.interceptor';
import {MatSelectModule} from '@angular/material/select';
import {CountryComponent} from './component/add/country/country.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {CollegeComponent} from './component/add/college/college.component';
import {DepartmentComponent} from './component/add/department/department.component';
import {UsersComponent} from './component/users/users.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {InformationComponent} from './component/add/information/information.component';
import {CommentComponent} from './component/add/comment/comment.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        MainComponent,
        SignInComponent,
        SignUpComponent,
        HomeComponent,
        AlertComponent,
        AddComponent,
        CountryComponent,
        CollegeComponent,
        DepartmentComponent,
        UsersComponent,
        InformationComponent,
        CommentComponent,
    ],
    exports: [
        MainComponent,
        AlertComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSidenavModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    providers: [
        authInterceptorProviders,
        DatePipe
    ]
})
export class MainModule {
}
