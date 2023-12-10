import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'keleman-value-changer',
  templateUrl: './value-changer.component.html',
  standalone: true,
  imports: [MatIconModule],
  styleUrls: ['./value-changer.component.scss'],
})
export class ValueChangerComponent {
  @Input('initialValue') value: number = 1;

  @Output('increse') onIncrease = new EventEmitter<number>();
  @Output('decrease') onDncrease = new EventEmitter<number>();

  increase(): void {
    this.value++;
    this.onIncrease.emit(this.value);
  }
  decrease(): void {
    if (this.value > 1) {
      this.value--;
    } else this.value = 0;
    this.onDncrease.emit(this.value);
  }
}
