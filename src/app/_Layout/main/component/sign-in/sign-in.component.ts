import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    userForm: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
            pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
        });
    }

    onSubmit() {
        this.submitted = true;
    }

    get userSignInForm() {
        return this.userForm.controls;
    }

}
