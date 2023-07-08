import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.scss'],
})
export class ProductNavbarComponent implements AfterViewInit {
  @ViewChild('stickyMenu') menuElement!: ElementRef;

  selectedTab = 'details';
  constructor(
    public applicationState: ApplicationStateService,
    private renderer: Renderer2
  ) {}

  makeSticky() {
    const menuPosition =
      this.menuElement.nativeElement.getBoundingClientRect().top;
    const headerHeight = document
      .getElementById('keleman-header')
      ?.getBoundingClientRect().height;

    if (menuPosition <= headerHeight! + 10) {
      this.renderer.addClass(this.menuElement.nativeElement, 'sticky');
      this.renderer.addClass(this.menuElement.nativeElement, 'shadow');
    } else {
      this.renderer.removeClass(this.menuElement.nativeElement, 'sticky');
      this.renderer.removeClass(this.menuElement.nativeElement, 'shadow');
    }
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'mousewheel', () => {
      this.makeSticky();
    });
  }
}
