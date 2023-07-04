import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[queryParamActive]',
  standalone: true,
})
export class QueryParamActiveDirective implements OnInit {
  @Input() queryParamActive!: string;
  @Input() queryParamValue!: string;
  @Input() activeClass!: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const queryParams = this.router.parseUrl(event.url).queryParams;
        const paramValue = queryParams[this.queryParamActive];
        if (paramValue === this.queryParamValue)
          this.renderer.addClass(
            this.elementRef.nativeElement,
            this.activeClass
          );
        else
          this.renderer.removeClass(
            this.elementRef.nativeElement,
            this.activeClass
          );
      }
    });
  }
}
