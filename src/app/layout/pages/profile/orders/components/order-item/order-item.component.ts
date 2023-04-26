import { Component } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ReturnRequestDialogComponent } from './return-request-dialog/return-request-dialog.component';

@Component({
  selector: 'keleman-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  constructor(
    public applicationState: ApplicationStateService,
    private _dialog: MatDialog
  ) {}

  openReturnRequestDialog(): void {
    this._dialog.open(ReturnRequestDialogComponent, {
      width: '550px',
      panelClass: 'custom-mat-dialog',
    });
  }
}
