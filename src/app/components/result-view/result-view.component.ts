import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-result-view',
  template: `
    <div class="alert" [ngClass]="classNames" role="alert" *ngIf="showResult">
      {{content}}
    </div>
  `,
  styleUrls: []
})
export class ResultViewComponent implements OnInit {

  classNames: string;
  showResult: boolean = false;
  content: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
