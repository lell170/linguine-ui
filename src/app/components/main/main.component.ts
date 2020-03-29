import {Component, QueryList, ViewChildren} from '@angular/core';
import {AlertService} from '../../service/alert-service.service';
import {AlertComponent} from '../alert/alert.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  @ViewChildren(AlertComponent) alert: QueryList<AlertComponent>;

  constructor(private alertService: AlertService) {
    this.alertService.subject.subscribe(alert => {
      this.alert.first.content = alert.content;
      this.alert.first.show = alert.visible;
      this.alert.first.cssClass = alert.type;
    });
  };

}
