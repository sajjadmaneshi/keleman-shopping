import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[textOnly]',
  standalone: true,
})
export class TextOnlyDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const charCode = event.which || event.keyCode;
    const charTyped = String.fromCharCode(charCode);

    // Prevent input if a numeric character is entered
    if (/^\d+$/.test(charTyped)) {
      event.preventDefault();
    }
  }
}
