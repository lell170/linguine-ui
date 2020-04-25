import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {RestClientService} from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private static BASE_URL: string = 'http://localhost/api/statistics/';

  constructor(private restClientService: RestClientService) {
  }

  getCurrentStatistics(): Observable<HttpResponse<any>> {
    return this.restClientService.httpGet(StatisticsService.BASE_URL + 'current', {observe: 'response'});
  }

}
