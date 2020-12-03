import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchValues} from '../../dto/search-values';
import {ResultValues} from '../../dto/result-values';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HomeService} from '../../_service/home.service';
import {AlertService} from '../../_service/alert.service';
import {Alert, AlertType} from '../../dto/alert';
import {filter} from 'rxjs/operators';
import {InfoResponse} from '../../dto/info-response';
import {DatePipe} from '@angular/common';
import {Department} from '../dto/department';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    result = new ResultValues();
    searchForm: FormGroup;

    country: Subscription;
    college: Subscription;
    department: Subscription;
    degree: Subscription;
    departmentsAll: Department[] = [];

    information: InfoResponse = null;

    constructor(private fb: FormBuilder, private homeService: HomeService, private alert: AlertService) {
    }

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            country: new FormControl(null, [Validators.required]),
            college: new FormControl(null, [Validators.required]),
            department: new FormControl(null, [Validators.required]),
            degree: new FormControl(null)
        });
        this.formControlValueChange();
        this.homeService.getCountry().subscribe( country => {
           this.result.countries = country;
        }, error => {
            this.alert.alert(new Alert('Problem', 'Cannot get country', AlertType.ERROR));
        });
        this.homeService.getDegrees().subscribe( data => {
            this.result.degrees = data.degrees;
        });
    }

    ngOnDestroy(): void {
        this.country.unsubscribe();
        this.college.unsubscribe();
        this.degree.unsubscribe();
    }

    ngSubmit(): void{
        if (this.searchForm.valid){
            this.homeService.getInfo(this.searchForm.get('department').value.id).subscribe( info => {
                this.information = info;
            });
        }
    }

    formControlValueChange(): void{
        this.country = this.searchForm.get('country').valueChanges.pipe(filter( data => !!data)).subscribe( () => {
            this.information = null;
            this.result.colleges = [];
            this.searchForm.get('college').setValue(  null);
            this.result.departments = [];
            this.searchForm.get('department').setValue(  null);
            this.homeService.getCollege(this.searchForm.get('country').value.id).subscribe( data => {
                this.result.colleges = data;
            });
        });

        this.college = this.searchForm.get('college').valueChanges.pipe(filter( data => !!data)).subscribe( () => {
            this.information = null;
            this.result.departments = [];
            this.searchForm.get('department').setValue(  null);
            this.homeService.getDepartment(this.searchForm.get('college').value.id).subscribe( data => {
                if(!this.searchForm.get('degree').value){
                    this.result.departments = data;
                    this.departmentsAll = data;
                }else{
                    this.result.departments = data.filter( item => item.degree === this.searchForm.get('degree').value);
                    this.departmentsAll = this.result.departments;
                }
            });
        });
        this.degree = this.searchForm.get('degree').valueChanges.subscribe( () => {
            this.information = null;
            this.result.departments = this.departmentsAll;
            if(this.searchForm.get('degree').value){
                this.result.departments = this.departmentsAll;
                this.result.departments = this.result.departments.filter( item => item.degree === this.searchForm.get('degree').value);
            }
        });
    }

    showData(): void{

    }

}
