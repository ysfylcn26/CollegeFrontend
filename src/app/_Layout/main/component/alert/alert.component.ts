import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Alert, AlertType} from '../../dto/alert';
import {AlertService} from '../../_service/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {

    alerts: Alert[] = [];
    alertsSubscription: Subscription;

    constructor(private alert: AlertService) {
    }

    ngOnInit(): void {
        this.alertsSubscription = this.alert.onAlert().subscribe(alert => {
            if (alert != null && alert.message != null) {
                this.alerts.push(alert);
                setTimeout(() => {
                    this.removeAlert(alert);
                }, 5000);
            }
        });
    }

    ngOnDestroy(): void {
        this.alertsSubscription.unsubscribe();
    }

    removeAlert(alert: Alert): void {
        if (!this.alerts.includes(alert)) {
            return;
        }
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];
        const alertTypeClass = {
            [AlertType.SUCCESS]: 'alert alert-success',
            [AlertType.ERROR]: 'alert alert-danger',
            [AlertType.WARNING]: 'alert alert-info',
            [AlertType.INFO]: 'alert alert-warning'
        };

        classes.push(alertTypeClass[alert.type]);
        return classes.join(' ');
    }

}
