import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddService} from '../../../_service/add.service';
import {AlertService} from '../../../_service/alert.service';
import {Alert, AlertType} from '../../../dto/alert';
import {Subscription} from 'rxjs';
import {Country} from '../../dto/country';
import {College} from '../../dto/college';

@Component({
    selector: 'app-college',
    templateUrl: './college.component.html',
    styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit, OnDestroy {

    countries: Country[] = [];
    colleges: College[] = [];
    formCollege: FormGroup;

    countryChange: Subscription;

    constructor(private fb: FormBuilder,
                private addService: AddService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        this.formCollege = this.fb.group({
            country: new FormControl(null, [Validators.required]),
            college: new FormControl(null),
            newCollege: new FormControl(null, [Validators.required, Validators.maxLength(300)])
        });
        this.addService.getCountry().subscribe(data => {
            this.countries = data;
        }, error => {
            this.alert.alert(new Alert('Error', 'Cannot get countries', AlertType.ERROR));
        });
        this.formValuChange();
    }

    formValuChange(): void {
        this.countryChange = this.formCollege.get('country').valueChanges.subscribe(data => {
            this.addService.getColleges(data.id).subscribe(colleges => {
                this.colleges = colleges;
                this.formCollege.controls.college.setValue(null);
            }, error => {
                this.alert.alert(new Alert('Error', 'Cannot get colleges', AlertType.ERROR));
            });
        });
    }

    ngOnDestroy(): void {
        this.countryChange?.unsubscribe();
    }

    ngSubmit(): void {
        if (this.formCollege.valid) {
            this.addService.addColleges({
                college: this.formCollege.value.newCollege,
                country: this.formCollege.value.country.id
            }).subscribe(data => {
                this.colleges = data;
                this.formCollege.controls.college.setValue(null);
                this.alert.alert(new Alert('Success', 'College is added', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'Cannot get colleges', AlertType.ERROR));
            });
        }
    }

    delete(): void {
        if (this.formCollege.value.college && this.formCollege.value.country) {
            this.addService.deleteCollege(this.formCollege.value.college.id, this.formCollege.value.country.id).subscribe(data => {
                this.colleges = data;
                this.formCollege.controls.college.setValue(null);
                this.alert.alert(new Alert('Success', 'College is deleted', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'Cannot delete college', AlertType.ERROR));
            });
        }
    }

    update(): void {
        if (this.formCollege.valid && this.formCollege.get('college').value?.name) {
            const newCollege = {
                country: this.formCollege.get('country').value.id,
                college: this.formCollege.get('newCollege').value
            };
            this.addService.updateCollege(this.formCollege.get('college').value.id, newCollege).subscribe(data => {
                this.colleges = data;
                this.formCollege.controls.college.setValue(null);
                this.alert.alert(new Alert('Success', 'College is updated', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'Cannot update college', AlertType.ERROR));
            });
        }
    }
}
