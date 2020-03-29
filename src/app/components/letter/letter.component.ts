import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-letter',
  template: '<div class="letter"><p class="text-center">{{letter}}</p></div>',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {

  @Input()
  letter: string;

  constructor() {
  }

  ngOnInit() {
  }

}
