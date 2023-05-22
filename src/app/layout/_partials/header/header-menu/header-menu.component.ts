import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'keleman-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements AfterViewInit {
  @ViewChild('dropDownMenu') dropDownMenu!: ElementRef;
  @ViewChild('myDrop') myDrop!: NgbDropdown;

  screenWidth!: number;
  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) document: Document
  ) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  ngAfterViewInit(): void {
    const clientHeight = document.documentElement.clientHeight;
    const headerHeight = document
      .getElementById('keleman-header')
      ?.getBoundingClientRect().height;

    const height = clientHeight - headerHeight!;
    this._renderer2.setStyle(
      this.dropDownMenu?.nativeElement,
      'max-height',
      `${height - 20}px`
    );
    this._renderer2.setStyle(
      this.dropDownMenu?.nativeElement,
      'overflow-y',
      'auto'
    );
  }

  onHover($event: any) {
    $event.stopPropagation();
    this.myDrop.open();
    const megaMenu = document.getElementById('mega-menu');
    const width = this.screenWidth - this.screenWidth * 0.1;
    this._renderer2.setStyle(megaMenu, 'width', `${width}px`);
  }
}
