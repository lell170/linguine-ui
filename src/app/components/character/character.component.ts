import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../model/character';

@Component({
  selector: 'app-character',
  template: `
    <div [ngClass]="character.additionalClassNames" class="character_element border rounded">
      <p class="text-center" [id]="character.id">{{character.content}}</p>
    </div>`,
  styleUrls: []
})
export class CharacterComponent implements OnInit {

  @Input()
  character: Character;

  constructor() {
  }

  ngOnInit() {
  }

}
