import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'keleman-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keleman-card.component.html',
  styleUrls: ['./keleman-card.component.scss'],
})
export class KelemanCardComponent {
  @Input() cardTitle: string = '';
}
