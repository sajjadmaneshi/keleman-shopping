import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isVisible = false;

  constructor() {}

  changePasswordVisibility() {
    this.isVisible = !this.isVisible;
  }
}
