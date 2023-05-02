import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.scss'],
})
export class ProductNavbarComponent {
  @ViewChild('myEl') nav!: ElementRef;
  constructor(
    public applicationState: ApplicationStateService,
    private _renderer2: Renderer2
  ) {}

  ngOnInit(): void {}

  @HostListener('document:wheel', ['$event'])
  onScroll() {
    const elementRect = this.nav?.nativeElement?.getBoundingClientRect();
    if (elementRect?.top === 165) {
      this._renderer2.addClass(this.nav.nativeElement, 'bg-white');
      this._renderer2.addClass(this.nav.nativeElement, 'shadow-sm');
      this._renderer2.addClass(this.nav.nativeElement, 'rounded');
    } else {
      this._renderer2.removeClass(this.nav.nativeElement, 'bg-white');
      this._renderer2.removeClass(this.nav.nativeElement, 'shadow-sm');
    }
  }
}
