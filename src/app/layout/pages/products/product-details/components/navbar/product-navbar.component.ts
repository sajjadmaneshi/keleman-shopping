import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'keleman-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.scss'],
})
export class ProductNavbarComponent implements AfterViewInit {
  @ViewChild('stickyMenu') menuElement!: ElementRef;

  @Input() productId!: number;

  selectedTab = 'details';

  constructor(
    public applicationState: ApplicationStateService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {}

  makeSticky() {
    const menuPosition =
      this.menuElement.nativeElement.getBoundingClientRect().top;
    const headerHeight = document
      .getElementById('keleman-header')
      ?.getBoundingClientRect().height;
    this.renderer.setStyle(
      this.menuElement.nativeElement,
      'top',
      `${headerHeight}px`
    );
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      if (this.applicationState.isTablet || this.applicationState.isPhone) {
        this.makeSticky();
      }
    }
  }
}
