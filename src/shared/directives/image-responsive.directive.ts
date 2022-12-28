import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Directive({
  selector: '[appImage]',
  standalone: true,
})
export class ImageResponsiveDirective implements OnInit, OnDestroy {
  @Input('srcSet') srcSet = new Array<SrcSet>();

  subscription = new Subscription();

  readonly breakpoint$ = this._responsive
    .observe([
      Breakpoints.Handset,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.Tablet,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.Web,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ])
    .pipe(distinctUntilChanged());

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    const breakPointSubscription = this.breakpoint$.subscribe(() => {
      console.log(1);
      this._breakpointChanged().then((currentBreakPoint) => {
        this._assignImageProperties(currentBreakPoint);
      });
    });
    this.subscription.add(breakPointSubscription);
  }

  private _breakpointChanged(): Promise<string> {
    return new Promise((resolve) => {
      if (this._responsive.isMatched(Breakpoints.Web)) {
        resolve(Breakpoints.Web);
      } else if (this._responsive.isMatched(Breakpoints.WebLandscape)) {
        resolve(Breakpoints.WebLandscape);
      } else if (this._responsive.isMatched(Breakpoints.WebPortrait)) {
        resolve(Breakpoints.WebPortrait);
      } else if (this._responsive.isMatched(Breakpoints.Tablet)) {
        resolve(Breakpoints.Tablet);
      } else if (this._responsive.isMatched(Breakpoints.TabletLandscape)) {
        resolve(Breakpoints.TabletLandscape);
      } else if (this._responsive.isMatched(Breakpoints.TabletPortrait)) {
        resolve(Breakpoints.TabletPortrait);
      } else if (this._responsive.isMatched(Breakpoints.Handset)) {
        resolve(Breakpoints.Handset);
      } else if (this._responsive.isMatched(Breakpoints.HandsetLandscape)) {
        resolve(Breakpoints.HandsetLandscape);
      } else if (this._responsive.isMatched(Breakpoints.HandsetPortrait)) {
        resolve(Breakpoints.HandsetPortrait);
      }
    });
  }

  private _assignImageProperties(currentBreakPoint: string) {
    this.srcSet.forEach((item) => {
      if (item.size === currentBreakPoint) {
        this._renderer.setProperty(this._el.nativeElement, 'src', item.src);
        if (item.width)
          this._renderer.setStyle(
            this._el.nativeElement,
            'width',
            `${item.width}px`
          );
        if (item.height)
          this._renderer.setStyle(
            this._el.nativeElement,
            'height',
            `${item.height}px`
          );
        if (item.class)
          this._renderer.addClass(this._el.nativeElement, item.class);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

export interface SrcSet {
  src: string;
  size: string;
  class?: string;
  width?: number;
  height?: number;
}
