import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[kelemanLoadingProgress]',
  standalone: true,
})
export class LoadingProgressDirective implements OnInit, AfterViewInit {
  @Input() loading = false;

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _cd: ChangeDetectorRef
  ) {}
  ngOnInit() {}

  ngAfterViewInit(): void {
    if (this.loading) {
      const element = this._el?.nativeElement;
      const loadingElement = document.createElement('div');
      this._renderer.addClass(loadingElement, 'spinner-border');
      this._renderer.addClass(element, 'd-flex');
      this._renderer.addClass(element, 'align-items-center');
      this._renderer.addClass(element, 'justify-content-between');
      this._renderer.appendChild(element, loadingElement);
      this._renderer.setAttribute(element, 'disabled', 'true');
      this._cd.detectChanges();
    }
  }
}
