import {Component} from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div class="m-2">
      <div [className]="cssClass" [innerHTML]="content" role="alert" *ngIf="show">
      </div>
    </div>
  `,
  styleUrls: []
})

export class AlertComponent {

  content: string;
  cssClass: string;
  show: boolean;

}
