import {Component, Injectable, OnInit} from '@angular/core';
import {Button} from '../../model/button';
import {Vocabulary} from '../../model/vocabulary';
import {VocabularyService} from '../../service/vocabulary.service';
import {AlertService} from '../../service/alert-service.service';
import {ChallengeService} from '../../service/challenge.service';

@Component({
  selector: 'app-training',
  template: `
    <div style="padding-top: 10px">
      <app-translation *ngIf="vocabulary" [vocabulary]="vocabulary"></app-translation>
      <app-button-panel [buttons]="buttons"></app-button-panel>
    </div>
  `,
  styleUrls: []
})

@Injectable()
export class TrainingComponent implements OnInit {

  buttons: Button[];
  vocabulary: Vocabulary;

  constructor(private vocabularyService: VocabularyService, private challengeService: ChallengeService) {

    //TODO subscribe blocks are empty
    const addToChallenge = new Button('Add to challenge', () => {
      this.challengeService.addToChallenge(this.vocabulary).subscribe();
      this.showNextRandomValue();
    });
    addToChallenge.className = 'btn-warning';

    const ignoreButton = new Button('Ignore', () => {
      this.vocabularyService.ignore(this.vocabulary).subscribe();
      this.showNextRandomValue();
    });
    ignoreButton.className = 'btn-danger';

    const skipButton = new Button('Skip', () => {
      this.showNextRandomValue();
    });
    skipButton.className = 'btn-secondary';

    this.buttons = [addToChallenge, ignoreButton, skipButton];
  }

  private showNextRandomValue() {
    this.vocabularyService.getRandomVocabulary().subscribe(response => {
      this.vocabulary = response.body;
    });
  }

  ngOnInit() {
    this.showNextRandomValue();
  }
}
