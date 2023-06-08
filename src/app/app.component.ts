import { Component } from '@angular/core';
import {OnlineStatusService} from './services/online-status.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public onlineStatusService: OnlineStatusService
  ) {}
}
