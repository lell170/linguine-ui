import {Injectable} from '@angular/core';
import {Alert} from '../model/alert';
import {Subject} from 'rxjs';
import {AlertsFactory} from '../factory/alertsFactory';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  subject: Subject<Alert> = new Subject<Alert>();

  hideAlert() {
    this.subject.next(AlertsFactory.createHiddenAlert(''))
  }
}
