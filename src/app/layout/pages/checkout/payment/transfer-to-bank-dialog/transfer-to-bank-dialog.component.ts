import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'keleman-transfer-to-bank-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './transfer-to-bank-dialog.component.html',
  styles: [
    `
      .transfer-to-bank {
        img {
          width: 35%;
        }
      }
    `,
  ],
})
export class TransferToBankDialogComponent {}
