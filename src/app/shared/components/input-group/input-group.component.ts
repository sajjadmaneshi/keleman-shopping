import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'keleman-input-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent {
  @Input() placeHolder?: string;
  @Input() textAlign: 'right' | 'center' | 'left' = 'right';
  @Input() type: 'text' | 'number' | 'password' = 'text';
}
