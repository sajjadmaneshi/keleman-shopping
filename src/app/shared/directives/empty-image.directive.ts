import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ENVIRONMENT } from '../../../environments/environment';

@Directive({
  selector: 'img[emptyImage]',
  standalone: true,
})
export class EmptyImageDirective implements OnInit {
  @Input() src!: string;

  downloadUrl = ENVIRONMENT.downloadUrl;
  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.src = this.src
      ? `${this.downloadUrl}/${this.src}`
      : 'assets/media/no-image.webp';
  }
}
