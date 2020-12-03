import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Alert, AlertType} from '../../dto/alert';
import {AlertService} from '../../_service/alert.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

    alertsSubscription: Subscription;

    constructor(private alert: AlertService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.alertsSubscription = this.alert.onAlert().subscribe(alert => {
            if (alert != null && alert.message != null) {
                this.showToaster(alert);
            }
        });
    }

    ngOnDestroy(): void {
        this.alertsSubscription.unsubscribe();
    }

    showToaster(alert: Alert): void {
        switch (alert.type) {
            case AlertType.SUCCESS:
                this.toastr.success(alert.message, alert.title, {timeOut: 5000});
                break;
            case AlertType.INFO:
                this.toastr.info(alert.message, alert.title, {timeOut: 5000});
                break;
            case AlertType.WARNING:
                this.toastr.warning(alert.message, alert.title, {timeOut: 5000});
                break;
            case AlertType.ERROR:
                this.toastr.error(alert.message, alert.title, {timeOut: 5000});
                break;
        }
    }
}
