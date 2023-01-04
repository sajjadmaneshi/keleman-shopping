import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'keleman-input-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keleman-input-group.component.html',
  styleUrls: ['./keleman-input-group.component.scss'],
})
export class KelemanInputGroupComponent {
  @Input() placeHolder?: string;
  @Input() type: 'text' | 'number' | 'password' = 'text';
}