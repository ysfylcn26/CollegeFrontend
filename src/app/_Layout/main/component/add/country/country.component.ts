import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddService} from '../../../_service/add.service';
import {Alert, AlertType} from '../../../dto/alert';
import {AlertService} from '../../../_service/alert.service';
import {Country} from '../../dto/country';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

    countries: Country[] = [];
    formCountry: FormGroup;

    constructor(private fb: FormBuilder,
                private addService: AddService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        this.addService.getCountry().subscribe(data => {
                this.countries = data;
            },
            error => {
                this.alert.alert(new Alert('Error', 'Cannot get countries', AlertType.ERROR));
            });
        this.formCountry = this.fb.group({
            country: new FormControl(null),
            newCountry: new FormControl(null, [Validators.required, Validators.maxLength(50)])
        });
    }

    ngSubmit(): void {
        if (this.formCountry.valid) {
            this.addService.addCountry({country: this.formCountry.get('newCountry').value}).subscribe(data => {
                    this.countries = data;
                    this.alert.alert(new Alert('Success', 'Country is added', AlertType.SUCCESS));
                },
                error => {
                    this.alert.alert(new Alert('Error', error.error.message, AlertType.ERROR));
                });
        } else {
            this.alert.alert(new Alert('Error', 'Not valid request', AlertType.ERROR));
        }
    }

    delete(): void {
        if (this.formCountry.value.country){
            this.addService.deleteCountry(this.formCountry.get('country').value.id).subscribe(data => {
                this.countries = data;
                this.formCountry.get('country').setValue(null);
                this.alert.alert(new Alert('Success', 'Country is deleted', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'Cannot delete country', AlertType.ERROR));
            });
        }
    }

    update(): void {
        if(this.formCountry.valid && this.formCountry.get('country').value.id){
            this.addService.updateCountry(this.formCountry.controls.country.value.id,
                {country: this.formCountry.get('newCountry').value}).subscribe( data => {
                this.countries = data;
                this.formCountry.controls.country.setValue(null);
                this.alert.alert(new Alert('Success', 'Country is updated', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'Cannot get countries', AlertType.ERROR));
            });
        }else {
            this.alert.alert(new Alert('Info', 'Country is same with update', AlertType.INFO));
        }
    }
}
