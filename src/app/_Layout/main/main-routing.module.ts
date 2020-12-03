import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {AdminGuard} from './guard/admin.guard';
import {ActiveGuard} from './guard/active.guard';
import {AddComponent} from './component/add/add.component';
import {CountryComponent} from './component/add/country/country.component';
import {CollegeComponent} from './component/add/college/college.component';
import {DepartmentComponent} from './component/add/department/department.component';
import {UsersComponent} from './component/users/users.component';
import {InformationComponent} from './component/add/information/information.component';
import {CommentComponent} from './component/add/comment/comment.component';
import {SuperadminGuard} from './guard/superadmin.guard';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent, canActivate: [AdminGuard]},
    {path: 'home', component: HomeComponent, canActivate: [ActiveGuard]},
    {path: 'users', component: UsersComponent, canActivate: [SuperadminGuard]},
    {path: 'add', component: AddComponent, canActivate: [AdminGuard], children: [
            {path: '', redirectTo: 'country', pathMatch: 'full'},
            {path: 'country', component: CountryComponent},
            {path: 'college', component: CollegeComponent},
            {path: 'department', component: DepartmentComponent},
            {path: 'information', component: InformationComponent, canActivate: [AdminGuard], outlet: 'commentAdd'},
            {path: 'comment', component: CommentComponent, canActivate: [SuperadminGuard], outlet: 'commentAdd'}
        ]},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
