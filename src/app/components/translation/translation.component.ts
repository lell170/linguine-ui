import { Component, Input, OnInit } from '@angular/core';
import { Vocabulary } from '../../model/vocabulary';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  @Input() vocabulary: Vocabulary;

  constructor() { }

  ngOnInit() {
  }
}
