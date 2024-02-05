import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'keleman-value-changer',
  templateUrl: './value-changer.component.html',
  standalone: true,
  imports: [MatIconModule, NgClass],
  styleUrls: ['./value-changer.component.scss'],
})
export class ValueChangerComponent {
  @Input('initialValue') value: number = 1;
  @Input('removable') removable: boolean = true;
  @Input('max') max!: number;
  @Input('min') min: number = 0;
  @Input('fontSize') fontSize: 1 | 2 | 3 | 4 | 5 | 6 = 3;
  @Input('disableIncrease')
  disableIncrease: boolean = false;
  @Input('disableDecrease') disableDecrease: boolean = false;
  @Output('value-change') valueChange = new EventEmitter<number>();

  increase(): void {
    if (this.max && this.max == this.value) return;
    this.value++;
    this.valueChange.emit(this.value);
  }
  decrease(): void {
    if (this.min && this.min === this.value) return;
    if (this.value > 0) {
      this.value--;
    }
    this.valueChange.emit(this.value);
  }
}
