import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[kelemanLoadingProgress]',
  standalone: true,
})
export class LoadingProgressDirective {
  @Input() set loading(loading: boolean) {
    if (loading) {
      this.showLoading();
    } else {
      this.hideLoading();
    }
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  private showLoading(): void {
    const loadingElement = this._renderer.createElement('div');
    this._renderer.addClass(loadingElement, 'spinner-border');
    this._renderer.setStyle(loadingElement, 'width', '15px');
    this._renderer.setStyle(loadingElement, 'height', '15px');
    this._renderer.addClass(loadingElement, 'mx-1');

    this._renderer.addClass(this._el.nativeElement, 'd-flex');
    this._renderer.addClass(this._el.nativeElement, 'align-items-center');
    this._renderer.addClass(this._el.nativeElement, 'justify-content-between');

    this._renderer.appendChild(this._el.nativeElement, loadingElement);
    this._renderer.setAttribute(this._el.nativeElement, 'disabled', 'true');
  }

  private hideLoading(): void {
    const loadingElement =
      this._el.nativeElement.querySelector('.spinner-border');
    if (loadingElement) {
      this._renderer.removeChild(this._el.nativeElement, loadingElement);
      this._renderer.removeClass(this._el.nativeElement, 'd-flex');
      this._renderer.removeClass(this._el.nativeElement, 'align-items-center');
      this._renderer.removeClass(
        this._el.nativeElement,
        'justify-content-between'
      );
      this._renderer.removeAttribute(this._el.nativeElement, 'disabled');
    }
  }
}
