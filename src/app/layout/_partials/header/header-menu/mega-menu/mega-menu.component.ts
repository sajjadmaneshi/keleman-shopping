import { Component } from '@angular/core';

@Component({
  selector: 'keleman-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent {
  activeItem!: string;

  onHover(activeItemId: string) {
    this.activeItem = activeItemId;
  }
}
