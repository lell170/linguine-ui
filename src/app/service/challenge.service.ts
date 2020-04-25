import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Vocabulary} from '../model/vocabulary';
import {Character} from '../model/character';
import {RestClientService} from './rest-client.service';
import {Challenge} from '../model/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private static BASE_URL: string = 'http://localhost/api/challenge/';

  result: Subject<string>;

  constructor(private restClientService: RestClientService) {
    this.result = new Subject<string>();
  }

  getRandomChallenge(): Observable<HttpResponse<any>> {
    return this.restClientService.httpGet(ChallengeService.BASE_URL + 'random', {observe: 'response'});
  }

  addToChallenge(vocabulary: Vocabulary): Observable<Object> {
    return this.restClientService.httpPost(ChallengeService.BASE_URL + 'add', vocabulary, {});
  }

  checkResultCells(characters: Character[]) {
    this.result.next(characters.map(item => item.content).join(''));
  }

  ignore(challenge: Challenge) {
    return this.restClientService.httpPost(ChallengeService.BASE_URL + 'ignore', challenge, {});
  }
}
