import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddService} from '../../../_service/add.service';
import {AlertService} from '../../../_service/alert.service';
import {Alert, AlertType} from '../../../dto/alert';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Department} from '../../dto/department';
import {Country} from '../../dto/country';
import {College} from '../../dto/college';

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

    countries: Country[] = [];
    colleges: College[] = [];
    departments: Department[] = [];
    degrees: string[] = [];
    formDepartment: FormGroup;

    countrySubscription: Subscription;
    collegeSubscription: Subscription;
    departmentSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private addService: AddService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        this.formDepartment = this.fb.group({
            country: new FormControl(null, [Validators.required]),
            college: new FormControl(null, [Validators.required]),
            department: new FormControl(null),
            degree: new FormControl(null, [Validators.required]),
            newDepartment: new FormControl(null, [Validators.required])
        });
        this.addService.getCountry().subscribe(data => {
            this.countries = data;
        }, error => {
            this.alert.alert(new Alert('Error', 'Countries cannot get', AlertType.ERROR));
        });
        this.addService.getDegree().subscribe(data => {
            this.degrees = data.degrees;
        }, error => {
            this.alert.alert(new Alert('Error', error.error.message, AlertType.ERROR));
        });
        this.formChangeValues();
    }

    ngOnDestroy(): void {
        this.countrySubscription?.unsubscribe();
        this.collegeSubscription?.unsubscribe();
        this.departmentSubscription?.unsubscribe();
        this.addService.setCommentDisable(null);
    }

    formChangeValues(): void {
        this.countrySubscription = this.formDepartment.get('country').valueChanges.pipe(filter(country => !!country)).subscribe(data => {
            this.addService.getColleges(data.id).subscribe(colleges => {
                this.formDepartment.get('college').setValue(null);
                this.formDepartment.get('department').setValue(null);
                this.addService.setCommentDisable(null);
                this.colleges = colleges;
                this.departments = [];
            }, error => {
                this.alert.alert(new Alert('Error', 'Countries cannot get', AlertType.ERROR));
            });
        });

        this.collegeSubscription = this.formDepartment.get('college').valueChanges.pipe(filter(college => !!college)).subscribe(data => {
            this.addService.getDepartments(data.id).subscribe(departments => {
                this.departments = departments;
                this.formDepartment.get('department').setValue(null);
                this.addService.setCommentDisable(null);
            });
        }, error => {
            this.alert.alert(new Alert('Error Department', 'Cannot get departments', AlertType.ERROR));
        });

        this.departmentSubscription = this.formDepartment.get('department').valueChanges.subscribe( data => {
           this.addService.setCommentDisable(data?.id);
        });
    }

    ngSubmit(): void {
        if (this.formDepartment.valid) {
            const department = {
                college: this.formDepartment.get('college').value.id,
                department: this.formDepartment.get('newDepartment').value,
                degree: this.formDepartment.get('degree').value,
            };
            this.addService.addDepartment(department).subscribe(data => {
                this.departments = data;
                this.alert.alert(new Alert('Success', 'Department is added', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', error.error.message, AlertType.ERROR));
            });
        } else {
            this.alert.alert(new Alert('Not Valid', 'These informations arent valid', AlertType.WARNING));
        }
    }

    delete(): void {
        if (this.formDepartment.get('department').value && this.formDepartment.get('college')) {
            this.addService.deleteDepartment(this.formDepartment.get('department').value.id,
                this.formDepartment.get('college').value.id).subscribe(data => {
                this.departments = data;
                this.formDepartment.get('department').setValue(null);
                this.alert.alert(new Alert('Success', 'Delete is success', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'Delete is not success', AlertType.ERROR));
            });
        }
    }

    update(): void {
        if (this.updateCheck()) {
            const newData = {
                college: this.formDepartment.get('college').value.id,
                department: this.formDepartment.get('newDepartment').value == null ? this.formDepartment.get('department').value.name
                    : this.formDepartment.get('newDepartment').value,
                degree: this.formDepartment.get('degree').value == null ? this.formDepartment.get('department').value.degree
                    : this.formDepartment.get('degree').value
            };
            this.addService.updateDepartment(this.formDepartment.get('department').value.id, newData).subscribe( data => {
                this.formDepartment.get('department').setValue(null);
                this.departments = data;
                this.alert.alert(new Alert('Success', 'Update is successful', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'Update is not successful', AlertType.ERROR));
            });
        }
    }

    updateCheck(): boolean {
        return (this.formDepartment.get('department').value && this.formDepartment.get('degree').value &&
            ((this.formDepartment.get('department').value?.degree !== this.formDepartment.get('degree').value) ||
                this.formDepartment.get('newDepartment').value));
    }
}
