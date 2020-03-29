import { Component, Input, OnInit } from '@angular/core';
import { Button } from '../../model/button';

@Component({
  selector: 'app-button-panel',
  template: '<app-button *ngFor="let button of buttons" [button]="button"></app-button>',
  styleUrls: ['./button-panel.component.css']
})
export class ButtonPanelComponent implements OnInit {

  @Input() buttons: Button[];

  constructor() {
  }

  ngOnInit() {
  }

}
