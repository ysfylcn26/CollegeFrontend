import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    formSubmitted = true;
    userForm: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(22)]),
            surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(22)]),
            email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
            pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
        })
    }

    onSubmit() {
        this.formSubmitted = false;
        this.submitted = true;
        if (this.userForm.valid) {
            console.log("Data valid");
            this.userForm.reset();
            this.formSubmitted = true;
        } else {
            console.log("Data valid degil");
            this.formSubmitted = true;
        }
    }

    get registerFormControl() {
        return this.userForm.controls;
    }

}
