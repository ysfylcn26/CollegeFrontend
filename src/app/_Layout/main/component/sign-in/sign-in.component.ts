import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Alert, AlertType } from '../../dto/alert';
import { User } from '../../dto/user';
import { AlertService } from '../../_service/alert.service';
import { AuthService } from '../../_service/auth.service';
import { TokenStorageService } from '../../_service/token-storage.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    userForm: FormGroup;
    submitted = false;
    formSubmitted = true;

    constructor(private fb: FormBuilder,
            private auth: AuthService,
            private token: TokenStorageService,
            private alert: AlertService) {
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            username: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(22)]),
            pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
        });
    }

    onSubmit() {
        this.submitted = true;
        this.formSubmitted = false;
        if(this.userForm.valid){
            this.auth.signIn(this.userForm.value).subscribe( data => {
                this.token.saveToken(data.token);
                this.token.saveUser(new User(data.id, data.username));
            },
            err => {
                this.alert.alert(new Alert("Wrong SignIn", "Data burada", AlertType.ERROR));
            }
            )
            this.userForm.reset();
            this.submitted = false;
            this.formSubmitted = true;
        }else{
            this.alert.alert(new Alert("SignIp","Not valid", AlertType.ERROR));
            this.formSubmitted = true;
        }
    }

    get userSignInForm() {
        return this.userForm.controls;
    }

}
