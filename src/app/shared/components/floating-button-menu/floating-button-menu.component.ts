import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'keleman-floating-button-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgbTooltip],
  templateUrl: './floating-button-menu.component.html',
  styleUrls: ['./floating-button-menu.component.scss'],
})
export class FloatingButtonMenuComponent {
  menuOpened = false;
  removeClass() {
    document.body.classList.remove('menuOpened');
  }
  toggleClass() {
    const body = document.body;
    if (body.classList.contains('menuOpened')) {
      this.removeClass();
      this.menuOpened = false;
    } else {
      body.classList.add('menuOpened');
      this.menuOpened = true;
    }
  }
}
