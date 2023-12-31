import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements AfterViewChecked {
  @ViewChild('mainContainer', { static: true }) mainContainer!: ElementRef;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {}

  private _initialLayout(): void {
    const header = this.document.getElementById(
      'keleman-header'
    ) as HTMLElement;

    const headerHeight = header.getBoundingClientRect().height;
    this.document.documentElement.style.setProperty(
      '--header-height',
      `${headerHeight}px`
    );
    this.mainContainer.nativeElement.classList.add('margin-top-header');
  }

  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this._platformId)) this._initialLayout();
  }
}
