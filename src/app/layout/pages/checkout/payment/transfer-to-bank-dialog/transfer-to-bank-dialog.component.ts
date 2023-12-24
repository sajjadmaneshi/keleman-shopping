import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'keleman-transfer-to-bank-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './transfer-to-bank-dialog.component.html',
  styleUrl: './transfer-to-bank-dialog.component.scss',
})
export class TransferToBankDialogComponent {}
