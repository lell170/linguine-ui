import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vocabulary} from '../model/vocabulary';
import {RestClientService} from './rest-client.service';
import {ContentType, HttpHeadersFactory} from '../factory/httpHeadersFactory';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  private static BASE_URL: string = 'http://localhost/api/vocabulary/';

  constructor(private httpClient: HttpClient, private restClientService: RestClientService) {
  }

  getRandomVocabulary(): Observable<HttpResponse<Vocabulary>> {
    return this.restClientService.httpGet(VocabularyService.BASE_URL + 'random', {observe: 'response'})
  }

  ignore(vocabulary: Vocabulary): Observable<Object> {
    console.log(JSON.stringify(vocabulary));
    const jsonType = HttpHeadersFactory.getHeaderByContentType(ContentType.JSON);
    return this.restClientService.httpPost(VocabularyService.BASE_URL + 'ignore', JSON.stringify(vocabulary), {headers: jsonType})
  }
}
