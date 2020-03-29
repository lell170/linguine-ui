import {Injectable, OnInit} from '@angular/core';
import {Subject, throwError} from 'rxjs';
import {Alert} from '../model/alert';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertsFactory} from '../factory/AlertsFactory';
import {AlertService} from './alert-service.service';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(private alertService: AlertService) {
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      const errorMessage = 'An error occurred: ' + error.error.message;
      this.createAlertObject(errorMessage);
    } else {
      // The backend returned an unsuccessful response code.
      const errorMessage = 'Backend returned code ' + error.status + ', body was: ' + error.error;
      this.createAlertObject(errorMessage);
    }
    // return an observable
    return throwError(error);
  }

  private createAlertObject(errorMessage: string) {
    console.error(errorMessage);
    const alertObject = AlertsFactory.createDangerAlert(errorMessage);
    this.alertService.subject.next(alertObject);
  }
}
