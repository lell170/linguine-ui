import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChallengeService} from '../../service/challenge.service';
import {CharacterComponent} from '../character/character.component';
import {Character} from '../../model/character';
import {CharacterFactory} from '../../factory/characterFactory';
import {FactoryGenerator} from '@angular/compiler-cli/src/ngtsc/shims';
import {CharacterService} from '../../service/character.service';
import {Subject} from 'rxjs';
import {Vocabulary} from '../../model/vocabulary';
import {Challenge} from '../../model/challenge';
import {Button} from '../../model/button';
import {ResultViewComponent} from '../result-view/result-view.component';
import {Statistics} from '../../model/statistics';
import {StatisticsService} from '../../service/statistics.service';

@Component({
  selector: 'app-challenge',
  template: `
    <div class="row">
      <div class="col mt-2">
        <div id="challengeComponent" class="row">
          <div id="challengeCard" class="col">
            <div class="alert bg-primary" role="alert" style="width: 100%">
              <p class="alert-heading text-white">Vocabulary DE:</p>
              <hr>
              <p class="text-white font-weight-bold" style="font-size: 18px;">{{challenge?.vocabulary.de}}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div id="cells" class="col mb-3">
            <div id="resultCharacters" style="width: 100%; display: flex;">
              <app-character #resultCharacters *ngFor="let character of resultChars" [character]="character"
                             (click)="putCharBack($event)"></app-character>
            </div>
            <div id="selectionCharacters" style="width: 100%; display: flex;">
              <!-- selection panel -->
              <app-character #selectionCharacters *ngFor="let character of selectionChars" [character]="character"
                             (click)="selectChar($event)"></app-character>
            </div>
          </div>
        </div>
        <div class="row">
          <div id="buttonPanel" class="col">
            <app-button-panel [buttons]="buttons"></app-button-panel>
          </div>
        </div>
      </div>
      <div class="col-3 mt-2">
        <div class="alert alert-dark" role="alert">
          <p class="alert-heading">Statistics</p>
          <hr>
          <p class="mb-0">Words: {{statistics?.wordsCount}}</p>
          <p class="mb-0">Active Challenges: {{statistics?.activeChallengesCount}}</p>
          <p class="mb-0">Solved: {{statistics?.solvedCount}}</p>
        </div>
      </div>
    </div>
    <app-result-view #resultView></app-result-view>
  `,
  styleUrls: []
})
//TODO make statistics as separate component
export class ChallengeComponent implements OnInit {

  challenge: Challenge;
  statistics: Statistics;

  resultChars: Character[] = [];
  selectionChars: Character[] = [];

  buttons: Button[];

  @ViewChildren('resultCharacters') resultCharComponents: QueryList<CharacterComponent>;
  @ViewChildren('selectionCharacters') selectionCharComponents: QueryList<CharacterComponent>;
  @ViewChild('resultView') resultView: ResultViewComponent;

  constructor(
    private challengeService: ChallengeService,
    private characterService: CharacterService,
    private statisticsService: StatisticsService) {
    // initialize buttons for component
    this.initializeButtons();
    // get random vocabulary from backend
    this.loadRandomChallenge();
    // subscribe result as subject (RxJS)
    this.challengeService.result.subscribe(value => {
      if (value == this.challenge.vocabulary.en) {
        //TODO build result view through factory method or use existed alert factory
        this.resultCharComponents.forEach(item => this.characterService.setCharacterSuccess(item.character));
        this.resultView.classNames = 'alert-success mt-2';
        this.resultView.showResult = true;
        this.resultView.content = 'Right! :-)';
      } else {
        this.resultCharComponents.forEach(item => this.characterService.setCharacterDanger(item.character));
        this.resultView.classNames = 'alert-danger mt-2';
        this.resultView.showResult = true;
        this.resultView.content = 'Try again :-(';
      }
    });
  }

  private loadRandomChallenge() {
    // hide result alert view
    if (this.resultView != undefined) {
      this.resultView.showResult = false;
    }
    // clear cells
    this.resultChars.length = 0;
    this.selectionChars.length = 0;
    // get random challenge from backend
    this.challengeService.getRandomChallenge().subscribe(challenge => {
      this.challenge = challenge.body;
      this.createCharacters();
    });
    // load currentStatistics
    this.loadStatistics();
  }

  private loadStatistics() {
    this.statisticsService.getCurrentStatistics().subscribe(value => this.statistics = value.body);
  }

  private initializeButtons() {
    //TODO build buttons trough factory method
    const addToChallenge = new Button('Next Challenge', () => {
      this.loadRandomChallenge();
    });
    addToChallenge.className = 'btn-primary';

    const ignoreButton = new Button('Ignore', () => {
      //TODO: subscribe is empty
      this.challengeService.ignore(this.challenge).subscribe();
      this.loadRandomChallenge();
    });
    ignoreButton.className = 'btn-warning';

    const helpButton = new Button('Open one cell...', () => {
      this.openNextCell();
    });
    helpButton.className = 'btn-info';

    this.buttons = [addToChallenge, ignoreButton, helpButton];
  }

  private createCharacters() {
    // randomize string...
    const shuffledWord = this.challenge.vocabulary.en.split('').sort(e => 0.5 - Math.random()).join('');
    // fill character arrays
    for (let i = 0; i < this.challenge.vocabulary.en.length; i++) {
      this.resultChars.push(CharacterFactory.createResultChar(i));
      this.selectionChars.push(CharacterFactory.createSelectionChar(i, shuffledWord.charAt(i)));
    }
  }

  selectChar(event: MouseEvent) {
    // first check if empty cells are available
    if (!this.isResultFull()) {
      // check if target element is type of HTMLParagraphElement
      if (event.target instanceof HTMLParagraphElement) {
        const selectionCharElement = event.target;
        const selectionCharComponent = this.selectionCharComponents.find(item => item.character.id === selectionCharElement.id);
        if (selectionCharComponent.character.additionalClassNames.includes('disabled')) {
          console.log('item is disabled!');
        } else {
          this.putCharToResult(selectionCharComponent);
        }
      }
    }
  }

  putCharToResult(selectionCharComponent: CharacterComponent) {
    const nextFreeResultCharComponent = this.resultCharComponents.find(item => item.character.content === '');
    nextFreeResultCharComponent.character.content = selectionCharComponent.character.content;
    nextFreeResultCharComponent.character.original_id = selectionCharComponent.character.id;
    this.characterService.switchStyle(selectionCharComponent);
    selectionCharComponent.character.disabled = true;
    if (this.isResultFull()) {
      this.challengeService.checkResultCells(this.resultCharComponents.map(item => item.character));
    }
  }

  putCharBack(event: MouseEvent) {
    // check if target element is type of HTMLParagraphElement
    if (event.target instanceof HTMLParagraphElement) {
      const paragraphElement = event.target as HTMLParagraphElement;
      const resultComponent = this.characterService.getCharComponentById(paragraphElement.id, this.resultCharComponents.toArray());
      if (resultComponent.character.content != '') {
        const selectionResultFilter = item => item.character.id === CharacterFactory.SELECTION_ID_PREFIX + resultComponent.character.original_id.replace(/[^0-9.]/g, '');
        const associatedSelectionChar = this.selectionCharComponents.find(selectionResultFilter);
        this.characterService.resetCharComponent(resultComponent);
        this.characterService.switchStyle(associatedSelectionChar);

        associatedSelectionChar.character.disabled = false;
      } else {
        console.log('empty character!');
      }
    }
  }

  private isResultFull() {
    return this.resultCharComponents.filter(item => item.character.content === '').length < 1;
  }

  private openNextCell() {
    const nextFreeCellIndex = this.resultCharComponents.toArray().findIndex(item => item.character.content === '');
    const selectionCharComponent = this.getCharacterForPosition(nextFreeCellIndex);
    this.putCharToResult(selectionCharComponent);
  }

  private getCharacterForPosition(position: number): CharacterComponent {
    const charAt = this.challenge.vocabulary.en.charAt(position);
    return this.selectionCharComponents.filter(item => !item.character.additionalClassNames.includes('disabled')).find(item => item.character.content === charAt);
  }

  ngOnInit() {

  }

}
