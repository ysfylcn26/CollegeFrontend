import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { AlertService } from '../../_service/alert.service';
import { AuthService } from '../../_service/auth.service';
import { Alert, AlertType } from '../../dto/alert';
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    formSubmitted = true;
    userForm: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder,
        private auth: AuthService,
        private alert: AlertService) {
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            username: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(22)]),
            email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
            pass: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
            role: new FormControl(null, [Validators.minLength(5), Validators.maxLength(5)])
        })
    }

    onSubmit() {
        this.formSubmitted = false;
        this.submitted = true;
        if (this.userForm.valid) {
            this.auth.signUp(Object.assign(this.userForm.value, {role: this.userForm.value.role == null ? null : [this.userForm.value.role]})).subscribe( data => {
                this.alert.alert(new Alert("Sign Up","Successful recording", AlertType.SUCCESS));
            },
            err => {
                this.alert.alert(new Alert("Sign Up",err.error.message, AlertType.ERROR));
            });
            this.userForm.reset();
            this.formSubmitted = true;
            this.submitted = false;
        } else {
            this.alert.alert(new Alert("Sign Up","Not valid", AlertType.ERROR));
            this.formSubmitted = true;
        }
    }

    get registerFormControl() {
        return this.userForm.controls;
    }

}
