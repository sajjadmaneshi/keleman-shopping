import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this._platformId)) this._initialLayout();
  }

  private _initialLayout(): void {
    const header = this.document.querySelector('header') as HTMLElement;
    const mainContainer = this.document.querySelector(
      '#main-container'
    ) as HTMLElement;
    const headerHeight = header.getBoundingClientRect().height;
    this.document.documentElement.style.setProperty(
      '--header-height',
      `${headerHeight}px`
    );
    mainContainer.classList.add('margin-top-header');
  }
}
