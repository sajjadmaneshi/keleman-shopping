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

  @Output('valueChange') change = new EventEmitter<number>();

  increase(): void {
    this.value++;
    this.change.emit(this.value);
  }
  decrease(): void {
    if (this.value > 1) {
      this.value--;
      this.change.emit(this.value);
    }
  }
}
