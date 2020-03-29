import { EventEmitter, Injectable, Output } from '@angular/core';
import { Alert } from "../model/alert";
import {Subject} from 'rxjs';
import {FactoryGenerator} from '@angular/compiler-cli/src/ngtsc/shims';
import {AlertsFactory} from '../factory/AlertsFactory';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  subject: Subject<Alert> = new Subject<Alert>();

  hideAlert() {
    this.subject.next(AlertsFactory.createHiddenAlert(''))
  }
}
