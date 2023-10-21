import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appThousandComma]',
  standalone: true,
})
export class ThousandCommaDirective implements OnInit {
  @Input('appThousandComma') initialValue!: number;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const value = event.target.value.replace(/,/g, '');
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      event.target.value = numericValue.toLocaleString('en-US');
    }
  }

  @HostListener('blur', ['$event']) onBlur(event: any): void {
    event.target.value = event.target.value.replace(/,/g, '');
  }

  ngOnInit(): void {
    if (this.initialValue !== undefined) {
      this.el.nativeElement.value = this.initialValue.toLocaleString('en-US');
    }
  }
}
