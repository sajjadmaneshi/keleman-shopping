import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[kelemanLoadingProgress]',
  standalone: true,
})
export class LoadingProgressDirective implements OnChanges {
  @Input() loading = false;

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['loading'].firstChange) {
      const element = this._el?.nativeElement;

      if (this.loading) {
        const loadingElement = document.createElement('div');
        this._renderer.addClass(loadingElement, 'spinner-border');
        this._renderer.addClass(element, 'd-flex');
        this._renderer.addClass(element, 'align-items-center');
        this._renderer.addClass(element, 'justify-content-between');
        this._renderer.appendChild(element, loadingElement);
        this._renderer.setAttribute(element, 'disabled', 'true');
      } else if (this.loading === false) {
        const loadingElement = document.querySelector('.spinner-border');
        this._renderer.removeChild(element, loadingElement);
        this._renderer.removeClass(element, 'd-flex');
        this._renderer.removeClass(element, 'align-items-center');
        this._renderer.removeClass(element, 'justify-content-between');
        this._renderer.removeAttribute(element, 'disabled');
      }
      this._cd.detectChanges();
    }
  }
}
