import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ENVIRONMENT } from '../../../environments/environment';

@Directive({
  selector: 'img[emptyImage]',
  standalone: true,
})
export class EmptyImageDirective implements OnInit, OnChanges {
  @Input() src!: string;
  @Input() ngSrc!: string;
  @Input() isAvatar = false;

  downloadUrl = ENVIRONMENT.downloadUrl;
  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    const src = this.src ? this.src : this.ngSrc;
    this.el.nativeElement.src = src
      ? `${this.downloadUrl}/${src}`
      : this.isAvatar
      ? 'assets/media/blank.webp'
      : 'assets/media/no-image.webp';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const src = this.src ? this.src : this.ngSrc;
    this.el.nativeElement.src = src
      ? `${this.downloadUrl}/${src}`
      : 'assets/media/no-image.webp';
  }
}
