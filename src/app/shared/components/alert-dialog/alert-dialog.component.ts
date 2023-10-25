import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertDialogDataModel } from './alert-dialog-data.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'keleman-alert-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogDataModel
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
