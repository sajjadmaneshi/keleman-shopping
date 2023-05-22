import { Component, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'keleman-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
})
export class MegaMenuComponent {
  @ViewChild('megaMenu') megaMenu!: HTMLElement;
  activeIndex = 1;

  constructor(private _renderer2: Renderer2) {}

  onHover(index: number) {
    this.activeIndex = index;
  }
}
