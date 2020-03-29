import {Component, Injectable, OnInit} from '@angular/core';
import {Button} from '../../model/button';
import {Vocabulary} from '../../model/vocabulary';
import {VocabularyService} from '../../service/vocabulary.service';
import {AlertService} from '../../service/alert-service.service';
import {ChallengeService} from '../../service/challenge.service';

@Component({
  selector: 'app-training',
  templateUrl: 'training.component.html',
  styleUrls: ['./training.component.css']
})

@Injectable()
export class TrainingComponent implements OnInit {

  buttons: Button[];
  vocabulary: Vocabulary;

  // TODO: (very) ugly constructor :-(
  constructor(private vocabularyService: VocabularyService, private challengeService: ChallengeService, private alertService: AlertService) {

    const addToChallenge = new Button('Add to challenge', () => {
      this.challengeService.addToChallenge(this.vocabulary).subscribe(response => {
        if (response.ok) {
          console.log('vocabulary will be added to challenge');
          this.alertService.hideAlert();
          this.showNextRandomValue();
        }
      });
    });
    addToChallenge.className = 'btn-warning';

    const dropButton = new Button('Drop (show never again)', () => {
      this.vocabularyService.dropVocabulary(this.vocabulary).subscribe(response => {
        if (response.ok) {
          console.log('vocabulary is dropped');
          this.showNextRandomValue();
          this.alertService.hideAlert();
        }
      });
    });
    dropButton.className = 'btn-danger';

    const skipButton = new Button('Skip', () => {
      this.showNextRandomValue();
    });
    skipButton.className = 'btn-secondary';

    this.buttons = [addToChallenge, dropButton, skipButton];
  }

  private showNextRandomValue() {
    this.vocabularyService.getRandomVocabulary().subscribe(response => {
      if (response.ok) {
        this.alertService.hideAlert();
      }
      this.vocabulary = response.body;
    });
  }

  ngOnInit() {
    this.showNextRandomValue();
  }
}
