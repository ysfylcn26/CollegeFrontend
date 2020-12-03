import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../main/_service/auth.service';
import {ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN} from '../main/constant';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private role: Subscription;
    private signStatu: Subscription;
    admin = false;
    statu = false;
    superAdmin = false;
    isResponsibility = false;
    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
            this.role = this.auth.getRoleValue().subscribe( role => {
                this.statu = false;
                this.superAdmin = false;
                if (role === ROLE_ADMIN) {
                    this.admin = true;
                }
                if (role === ROLE_SUPER_ADMIN) {
                    this.superAdmin = true;
                }
            });
            this.signStatu = this.auth.getSignStatus().subscribe( data => {
                if (data || this.auth.hasToken()) {
                    this.statu = true;
                }
                else {
                    this.statu = false;
                }
            });
            this.auth.isResponsibility().subscribe( data => {
               if(data){
                   this.isResponsibility = true;
               }
            });
    }

    ngOnDestroy(): void{
        this.role.unsubscribe();
        this.signStatu.unsubscribe();
    }

    signOut(): void{
        this.statu = false;
        this.admin = false;
        this.superAdmin = false;
        sessionStorage.clear();
    }
}
