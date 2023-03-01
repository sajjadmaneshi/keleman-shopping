import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'standalone-value-changer',
  templateUrl: './keleman-value-changer.component.html',
  standalone: true,
  imports: [InlineSVGModule, MatIconModule],
  styleUrls: ['./keleman-value-changer.component.scss'],
})
export class KelemanValueChangerComponent {
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
