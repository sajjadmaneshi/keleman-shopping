import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverClass]',
  standalone: true,
})
export class HoverClassDirective {
  constructor(private el: ElementRef, private _renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this._renderer.addClass(this.el.nativeElement, 'active');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._renderer.removeClass(this.el.nativeElement, 'active');
  }
}
