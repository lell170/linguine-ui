import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vocabulary} from '../model/vocabulary';
import {catchError} from 'rxjs/operators';
import {RestClientService} from './rest-client.service';
import {ContentType, HttpHeadersFactory} from '../factory/HttpHeadersFactory';

const BASE_URL = 'http://localhost/api/vocabulary/';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  constructor(private httpClient: HttpClient, private restClientService: RestClientService) {
  }

  getRandomVocabulary(): Observable<HttpResponse<Vocabulary>> {
    return this.httpClient.get<Vocabulary>(BASE_URL + 'random', {observe: 'response'}).pipe(
      catchError(err => {
        return this.restClientService.handleError(err);
      }));
  }

  updateVocabulary(vocabulary: Vocabulary): Observable<HttpResponse<Vocabulary>> {
    return this.httpClient.put<Vocabulary>(BASE_URL + 'update', vocabulary, {observe: 'response'}).pipe(
      catchError(err => {
        return this.restClientService.handleError(err);
      }));
  }

  dropVocabulary(vocabulary: Vocabulary): Observable<HttpResponse<Vocabulary>> {
    const jsonType = HttpHeadersFactory.getHeaderByContentType(ContentType.JSON);
    return this.httpClient.post<Vocabulary>(BASE_URL + 'drop', JSON.stringify(vocabulary), {observe: 'response', headers: jsonType}).pipe(
      catchError(err => {
        return this.restClientService.handleError(err);
      }));
  }
}
