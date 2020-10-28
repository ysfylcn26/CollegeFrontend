import {Component, OnInit} from '@angular/core';
import {AuthService} from './_service/auth.service';
import {TOKEN_KEY} from '../main/constant';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(private auditService: AuthService) {
    }

    ngOnInit(): void {
        if(sessionStorage.getItem(TOKEN_KEY)){
            this.auditService.setInitialValue();
        }
    }

}
