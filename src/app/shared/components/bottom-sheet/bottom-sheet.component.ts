import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'keleman-bottom-sheet',
  standalone: true,
  imports: [CommonModule, MatBottomSheetModule, MatListModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {}
