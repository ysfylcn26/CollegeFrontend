import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../main/_service/auth.service';
import { ROLE_USER, ROLE_ADMIN } from '../main/constant';
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
    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
            this.role = this.auth.getRoleValue().subscribe( role => {
                if (role === ROLE_ADMIN || this.auth.isAdmin()) {
                    this.admin = true;
                }
                else {
                    this.admin = false;
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
    }

    ngOnDestroy(): void {
        this.role.unsubscribe();
        this.signStatu.unsubscribe();
    }

    signOut(){
        this.statu = false;
        this.admin = false;
        sessionStorage.clear();
    }
}
