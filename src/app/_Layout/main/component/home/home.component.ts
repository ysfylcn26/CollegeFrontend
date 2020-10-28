import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchValues} from '../../dto/search-values';
import {ResultValues} from '../../dto/result-values';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    selected = new SearchValues();
    result = new ResultValues();
    searchForm: FormGroup;

    selectedValues: SearchValues = new SearchValues();
    country: Subscription;
    college: Subscription;
    department: Subscription;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            country: new FormControl(null, [Validators.required]),
            college: new FormControl(null, [Validators.required]),
            department: new FormControl(null, [Validators.required]),
            degree: new FormControl(null, [Validators.required])
        });
        this.formControlValueChange();
    }

    ngOnDestroy(): void {
        this.country.unsubscribe();
        this.college.unsubscribe();
        this.department.unsubscribe();
    }

    ngSubmit(): void{
        if (this.searchForm.valid){

        }
    }

    formControlValueChange(): void{
        this.country = this.searchForm.get('country').valueChanges.subscribe( () => {
            this.searchForm.get('college').updateValueAndValidity();
            this.result.colleges = [];
            this.selected.college = null;
            this.searchForm.get('department').updateValueAndValidity();
            this.result.departments = [];
            this.selected.department = null;
            this.searchForm.get('degree').updateValueAndValidity();
            this.result.degrees = [];
            this.selected.degree = null;
        });

        this.college = this.searchForm.get('college').valueChanges.subscribe( () => {
            this.searchForm.get('department').updateValueAndValidity();
            this.result.departments = [];
            this.selected.department = null;
            this.searchForm.get('degree').updateValueAndValidity();
            this.result.degrees = [];
            this.selected.degree = null;
        });

        this.department = this.searchForm.get('department').valueChanges.subscribe( () => {
            this.searchForm.get('degree').updateValueAndValidity();
            this.result.degrees = [];
            this.selected.degree = null;
        });
    }

    showData(): void{

    }

}
