import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberOnly]',
  standalone: true,
})
export class NumberOnlyDirective {
  isSelectAll = false;
  @Input() numberOnly: number = 11;
  constructor(private _el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.which;
    const input = this._el.nativeElement as HTMLInputElement;
    if (this.isSelectAll) {
      input.value = '';
      this.isSelectAll = false;
    }
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
      if (!(event.ctrlKey && keyCode === 65)) {
        event.preventDefault();
      }
    }
  }
  @HostListener('dblclick', ['$event']) onDoubleClick(event: MouseEvent) {
    const input = this._el.nativeElement as HTMLInputElement;

    // Check if the selection covers the entire input value
    if (
      input.selectionStart === 0 &&
      input.selectionEnd === input.value.length
    ) {
      // Clear the input value before allowing the user to enter a new value
      this.isSelectAll = true;
    }
  }
}
