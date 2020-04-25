import { Component, ViewChild } from '@angular/core';
import { AlertService } from '../../service/alert-service.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-main',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-alert #alert></app-alert>
  `,
  styleUrls: []
})

export class MainComponent {

  @ViewChild('alert') alert: AlertComponent;

  constructor(private alertService: AlertService) {
    this.alertService.subject.subscribe(alert => {
      this.alert.content = alert.content;
      this.alert.show = alert.visible;
      this.alert.cssClass = alert.type;
    });
  };

}
