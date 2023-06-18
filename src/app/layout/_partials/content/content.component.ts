import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'keleman-content',
  templateUrl: './content.component.html',
})
export class ContentComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this._initialLayout();
  }
  private _initialLayout(): void {
    const header = document.querySelector('header') as HTMLElement;
    const mainContainer = document.querySelector(
      '#main-container'
    ) as HTMLElement;
    const headerHeight = header.getBoundingClientRect().height;
    mainContainer.style.marginTop = `${headerHeight}px`;
  }
}
