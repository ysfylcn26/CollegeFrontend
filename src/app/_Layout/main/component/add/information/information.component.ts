import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AddService} from '../../../_service/add.service';
import {Subscription} from 'rxjs';
import {Info} from '../../../dto/info';
import {AlertService} from '../../../_service/alert.service';
import {Alert, AlertType} from '../../../dto/alert';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, OnDestroy {

    formInformation: FormGroup;
    idSubscription: Subscription;
    id: string = null;
    name: string = null;

    constructor(private fb: FormBuilder,
                private addService: AddService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        this.formInformation = this.fb.group({
            fee: new FormControl(0),
            info: new FormControl(null),
            start: new FormControl(null),
            end: new FormControl(null)
        });
        this.idSubscription = this.addService.getCommentDisable().subscribe(data => {
            if (data) {
                this.id = data;
                this.addService.getInfoValues(data).subscribe(infos => {
                    this.name = infos.name + ' - ' + infos.degree;
                    this.formInformation.get('fee').setValue(infos.fee);
                    this.formInformation.get('info').setValue(infos.info);
                    this.formInformation.get('start').setValue(new Date(infos.start.toString()));
                    this.formInformation.get('end').setValue(infos.end);
                }, error => {
                    this.alert.alert(new Alert('Error', 'We cannot get note and fee', AlertType.ERROR));
                    this.id = null;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.idSubscription.unsubscribe();
    }

    submit(): void {
        if (this.id) {
            const info = new Info({
                id: this.id, fee: this.formInformation.get('fee').value,
                info: this.formInformation.get('info').value?.trim(),
                start: this.formInformation.get('start').value,
                end: this.formInformation.get('end').value
            });
            this.addService.saveInfo(info).subscribe(infos => {
                this.name = infos.name + ' - ' + infos.degree;
                this.formInformation.get('fee').setValue(infos.fee);
                this.formInformation.get('info').setValue(infos.info);
                this.formInformation.get('start').setValue(infos.start);
                this.formInformation.get('end').setValue(infos.end);
                this.alert.alert(new Alert('Success', 'Data is successfull', AlertType.SUCCESS));
            }, error => {
                this.alert.alert(new Alert('Error', 'We cannot get note and fee', AlertType.ERROR));
                this.id = null;
            });
        }

    }
}
