import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[loadingLazy]',
  standalone: true,
})
export class LazyLoadingDirective {
  constructor(private el: ElementRef<HTMLImageElement>) {
    this.el.nativeElement.loading = 'lazy';
  }
}
