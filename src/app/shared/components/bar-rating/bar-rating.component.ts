import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'keleman-bar-rating',
  standalone: true,
  imports: [CommonModule, NgbRating, MatIconModule],
  templateUrl: './bar-rating.component.html',
  styleUrls: ['./bar-rating.component.scss'],
})
export class BarRatingComponent {
  @Input() rate: number = 0;
  @Input() max: number = 10;
  @Input() readonly: boolean = false;
}
