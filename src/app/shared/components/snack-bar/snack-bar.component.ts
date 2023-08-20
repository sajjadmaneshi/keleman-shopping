import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

@Component({
  selector: 'keleman-snack-bar',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  message!: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}
