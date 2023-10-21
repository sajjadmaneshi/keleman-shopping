import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ApplicationStateService } from '../services/application-state.service';

@Directive({
  selector: '[appSymbol]',
  standalone: true,
})
export class SymbolDirective implements AfterViewInit {
  @Input() breakPoints: SymbolBreakPoint[] = ['md'];
  @Input() type: SymbolType = 'circle';
  @Input() sizes: number[] = [3];

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private _el: ElementRef,
    private _renderer: Renderer2,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this._platformId)) this.updateSymbolSizes();
  }
  private updateSymbolSizes() {
    const windowWidth = this.document.defaultView?.innerWidth!;
    let selectedSizeIndex = 0;
    for (const [index, breakpoint] of this.breakPoints.entries()) {
      const breakpointWidth = this.getBreakpointWidth(breakpoint);
      if (windowWidth >= breakpointWidth) {
        selectedSizeIndex = index;
      } else break;
    }
    const selectedSymbolSize = this.sizes[selectedSizeIndex];
    const selectedSize = this.breakPoints[selectedSizeIndex];

    this.setStyle(this._el.nativeElement, 'display', 'inline-block');
    this.setStyle(this._el.nativeElement, 'flex-shrink', '0');
    this.setStyle(this._el.nativeElement, 'position', 'relative');

    const imgElement = this._el.nativeElement.querySelector('img');
    const fontSize = parseFloat(
      getComputedStyle(this.document.documentElement).fontSize
    );
    const pixelSize = selectedSymbolSize * fontSize + 'px';
    if (imgElement) {
      this.setStyle(this._el.nativeElement, 'width', pixelSize);
      this.setStyle(this._el.nativeElement, 'height', pixelSize);
      this.setStyle(imgElement, 'width', pixelSize);
      this.setStyle(imgElement, 'height', pixelSize);
      this.setStyle(
        imgElement,
        'border-radius',
        this.type === 'circle' ? '50%' : '0'
      );
      this.setStyle(
        this._el.nativeElement,
        'border-radius',
        this.type === 'circle' ? '50%' : '0'
      );
    }
  }

  private setStyle(element: HTMLElement, property: string, value: string) {
    this._renderer.setStyle(element, property, value);
  }

  private getBreakpointWidth(SymbolBreakPoint: string): number {
    switch (SymbolBreakPoint) {
      case 'sm':
        return 576;
      case 'md':
        return 768;
      case 'lg':
        return 992;
      default:
        return 0;
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this._platformId)) this.updateSymbolSizes();
  }
}
export type SymbolBreakPoint = 'sm' | 'md' | 'lg' | 'xl';
export type SymbolType = 'square' | 'circle';
