import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[emptyImage]',
  standalone: true,
})
export class EmptyImageDirective implements OnInit {
  @Input() src!: string;
  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.src = this.src
      ? this.src
      : 'assets/media/no-image.webp';
  }
}
