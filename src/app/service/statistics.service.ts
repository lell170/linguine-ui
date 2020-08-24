import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {Statistics} from '../model/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private static BASE_URL: string = 'http://localhost:8080/api/statistics/current';

  constructor(private ngZone: NgZone) {
  }

  getCurrentStatistics() {
    return new Observable<Statistics>(observer => {
      const eventSource = new EventSource(StatisticsService.BASE_URL, {withCredentials: false});

      eventSource.onmessage = event => {
        this.ngZone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      };

      eventSource.onerror = event => {
        this.ngZone.run(() => {
          observer.error(event);
        });
      };
    });
  }

}
