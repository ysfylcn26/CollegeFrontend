import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {AdminGuard} from './guard/admin.guard';

const routes: Routes = [
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent, canActivate: [AdminGuard]},
    {path: 'home', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
