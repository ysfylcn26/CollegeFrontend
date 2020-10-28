import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../dto/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts = new BehaviorSubject<Alert>(null);

  constructor() { }

  onAlert(): Observable<Alert> {
    return this.alerts.asObservable();
  }

  alert(alert: Alert): void{
    this.alerts.next(alert);
  }

}
