import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this._initialLayout();
  }
  private _initialLayout(): void {
    const header = document.querySelector('header') as HTMLElement;
    const mainContainer = document.querySelector(
      '#main-container'
    ) as HTMLElement;
    const headerHeight = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      '--header-height',
      `${headerHeight}px`
    );
    mainContainer.classList.add('margin-top-header');
  }
}
