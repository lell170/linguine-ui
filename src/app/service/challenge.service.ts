import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Vocabulary} from '../model/vocabulary';
import {Challenge} from '../model/challenge';

const BASE_URL = 'http://localhost/api/challenge/';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private httpClient: HttpClient) {
  }

  getRandomChallenge(): Observable<HttpResponse<Challenge>> {
    return this.httpClient.get<Challenge>(BASE_URL + 'random', {observe: 'response'});
  }

  addToChallenge(vocabulary: Vocabulary): Observable<HttpResponse<any>> {
    console.log(vocabulary.en);
    console.log(vocabulary.id);
    console.log(vocabulary);
    return this.httpClient.post(BASE_URL + 'add', vocabulary, {observe: 'response'});
  }
}
