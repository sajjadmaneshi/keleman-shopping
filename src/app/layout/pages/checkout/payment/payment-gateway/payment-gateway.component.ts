import { Component, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { PaymentGatewayViewModel } from '../../data/models/payment-gateway.view-model';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LazyLoadingDirective } from '../../../../../shared/directives/lazy-loading.directive';
import { UserCreditViewModel } from '../../../profile/data/view-models/user-credit.view-model';
import { AttachReceiptDialogComponent } from '../attach-receipt-dilog/attach-receipt-dialog.component';
import { AttachChequeDialogComponent } from '../attach-cheque-dialog/attach-cheque-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'keleman-payment-gateway',
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule,
    LazyLoadingDirective,
    DecimalPipe,
  ],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.scss',
})
export class PaymentGatewayComponent {
  @Input() gateway!: PaymentGatewayViewModel;
  @Input() credit!: UserCreditViewModel;
  @Input() selected: boolean = false;
  @Input() loading = new Observable<boolean>();

  constructor(private readonly _dialog: MatDialog) {}
  openAttachReceiptDialog(): void {
    this._dialog.open(AttachReceiptDialogComponent, {
      width: '800px',
      autoFocus: false,
      panelClass: 'custom-mat-dialog',
    });
  }

  openAttachChequeDialog() {
    this._dialog.open(AttachChequeDialogComponent, {
      width: '800px',
      autoFocus: false,
      panelClass: 'custom-mat-dialog',
    });
  }
}
