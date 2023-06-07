import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberOnly]',
  standalone: true,
})
export class NumberOnlyDirective {
  @Input() numberOnly: number = 11;
  constructor(private _el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.which;
    const input = this._el.nativeElement as HTMLInputElement;
    const currentValue: string = input.value;
    // Allow special keys such as backspace, delete, and arrow keys
    if (
      keyCode === 46 || // delete
      keyCode === 8 || // backspace
      keyCode === 9 || // tab
      keyCode === 27 || // escape
      (keyCode === 65 && event.ctrlKey === true) || // Ctrl+A
      (keyCode >= 35 && keyCode <= 39) // home, end, left, right
    ) {
      return;
    }

    // Allow only numeric characters
    if (
      ((event.shiftKey || keyCode < 48 || keyCode > 57) &&
        (keyCode < 96 || keyCode > 105)) ||
      currentValue.length >= this.numberOnly
    ) {
      event.preventDefault();
    }
  }
}
