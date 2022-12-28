import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  timeLeft: number = 59;
  subscribeTimer: any = 59;

  constructor() {
    this.observableTimer();
  }
  observableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe((val) => {
      this.subscribeTimer = this.timeLeft - val;
    });
  }
}
