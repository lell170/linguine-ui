import { Component, Input, OnInit } from '@angular/core';
import { Button } from '../../model/button';

@Component({
  selector: 'app-button',
  template: '<button type="button" class="btn btn-primary mr-2" [ngClass]="button.className" (click)="button.buttonService()">{{button.name}}</button>',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() button: Button;

  ngOnInit() {
  }
}
