import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'standalone-input-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keleman-input-group.component.html',
  styleUrls: ['./keleman-input-group.component.scss'],
})
export class KelemanInputGroupComponent {
  @Input() placeHolder?: string;
  @Input() textAlign: 'right' | 'center' | 'left' = 'right';
  @Input() type: 'text' | 'number' | 'password' = 'text';
}
