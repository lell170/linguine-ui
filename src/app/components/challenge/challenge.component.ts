import {Component, OnInit} from '@angular/core';
import {ChallengeService} from '../../service/challenge.service';
import {Vocabulary} from '../../model/vocabulary';
import {Challenge} from '../../model/challenge';
import {LetterComponent} from '../letter/letter.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  german: string = '';
  english: string = '';
  letters: string[] = [];

  constructor(private challengeService: ChallengeService) {
    challengeService.getRandomChallenge().subscribe(value => {
      this.german = value.body.vocabulary.de;
      this.english = value.body.vocabulary.en;
      this.fillLetters();
    }, (error) => {
      console.log('get - ERROR', error);
    });
  }

  fillLetters() {
    for (let i = 0; i < this.english.length; i++) {
      this.letters.push(this.english.charAt(i));
    }
  }

  ngOnInit() {
  }

}
