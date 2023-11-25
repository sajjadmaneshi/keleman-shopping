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
  @Input() isAvatar = false;

  downloadUrl = ENVIRONMENT.downloadUrl;
  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.src = this.src
      ? `${this.downloadUrl}/${this.src}`
      : this.isAvatar
      ? 'assets/media/blank.webp'
      : 'assets/media/no-image.webp';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.el.nativeElement.src = this.src
      ? `${this.downloadUrl}/${this.src}`
      : 'assets/media/no-image.webp';
  }
}
