import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'keleman-floating-button-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgbTooltip, FaIconComponent],
  templateUrl: './floating-button-menu.component.html',
})
export class FloatingButtonMenuComponent {
  menuOpened = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  removeClass() {
    this.document.body.classList.remove('menuOpened');
    this.menuOpened = false;
  }

  toggleClass($event: any) {
    const body = this.document.body;
    if (!this.menuOpened) {
      $event.preventDefault();
      body.classList.add('menuOpened');
      this.menuOpened = true;
    } else {
      this.removeClass();
    }
  }
}
