import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AlertsFactory} from '../factory/alertsFactory';
import {AlertService} from './alert-service.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(private alertService: AlertService, private httpClient: HttpClient) {
  }

  httpGet(url: string, options: {}): Observable<HttpResponse<any>> {
    const observable = this.httpClient.get<any>(url, options).pipe(
      catchError(err => {
        return this.handleError(err);
      }));
    this.alertService.hideAlert();
    return observable;
  }

  httpPost(url: string, obj: any, options: {}): Observable<Object> {
    const observable = this.httpClient.post(url, obj, options).pipe(
      catchError(err => {
        return this.handleError(err);
      }));
    this.alertService.hideAlert();
    return observable;
  }

  private handleError(error: HttpErrorResponse) {
    this.createAlertObject(error.message);
    return throwError(error);
  }

  private createAlertObject(errorMessage: string) {
    console.error(errorMessage);
    const alertObject = AlertsFactory.createDangerAlert(errorMessage);
    this.alertService.subject.next(alertObject);
  }
}
