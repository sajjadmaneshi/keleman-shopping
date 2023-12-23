import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttachReceiptDialogComponent } from './attach-receipt-dilog/attach-receipt-dialog.component';
import { AttachChequeDialogComponent } from './attach-cheque-dialog/attach-cheque-dialog.component';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { BasketService } from '../purchase/basket.service';
import { PaymentGatewayViewModel } from '../data/models/payment-gateway.view-model';
import { UserCreditViewModel } from '../../profile/data/view-models/user-credit.view-model';
import { InitialAppService } from '../../../../shared/services/initial-app.service';
import { LoadingService } from '../../../../../common/services/loading.service';
import { BillRepository } from '../data/repositories/bill.repository';
import { SaveOrderDto } from '../data/repositories/save-order.dto';
import { FormControl, Validators } from '@angular/forms';
import { SetDiscountDto } from '../data/dto/set-discount.dto';

@Component({
  selector: 'keleman-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  destroy$ = new Subject<void>();
  paymentGateWays: PaymentGatewayViewModel[] = [];
  sunbscriptions = new Subscription();
  userCredit = new UserCreditViewModel(0, 0);
  isFormSubmitted = false;
  billId: number | null = null;
  delivaryAddress!: number;
  selectedPaymentGateWayIds: number[] = [];
  submittedDiscountCode: string = '';
  discountCode = new FormControl('', Validators.required);
  description = new FormControl('');
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _basketService: BasketService,
    private readonly _initialAppService: InitialAppService,
    private readonly _billRepository: BillRepository,
    public readonly loadingService: LoadingService
  ) {
    this.loadingService.startLoading('read', 'paymentGateway');

    this._basketService.paymentGateways
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'paymentGateway')),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.paymentGateWays = result;
      });

    this._initialAppService.userCredit
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => (this.userCredit = result));
    this._basketService.delivaryAddress
      .pipe(takeUntil(this.destroy$))
      .subscribe((address) => {
        this.delivaryAddress = address!;
      });
    this._basketService.bankAddress.subscribe((result) => {
      if (result) {
        window.open(result, '_blank');
      }
    });
  }

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

  saveOrder(paymentGatewayId: number) {
    this.loadingService.startLoading('add', 'saveOrder');
    const dto = {
      discountCode: this.submittedDiscountCode,
      paymentGatewayId,
      addressId: this.delivaryAddress,
      description: this.description.value,
      billId: this.billId,
    } as SaveOrderDto;

    this._billRepository
      .save(dto)
      .pipe(
        tap(() => this.loadingService.stopLoading('add', 'saveOrder')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.billId = result.result!;
          this.selectedPaymentGateWayIds.push(paymentGatewayId);
          this._initialAppService.getUserCredit();
          if (paymentGatewayId < 8) {
            this._basketService.pay(this.billId, paymentGatewayId);
          }
        },
        error: () => this.loadingService.stopLoading('add', 'saveOrder'),
      });
  }

  isInSelectedGateways(paymentGatwayId: number) {
    return (
      this.selectedPaymentGateWayIds.findIndex((x) => x === paymentGatwayId) !=
      -1
    );
  }

  submitDiscount() {
    this.isFormSubmitted = true;
    if (this.discountCode.valid) {
      this.loadingService.startLoading('add', 'discount');
      const dto = { discountCode: this.discountCode.value } as SetDiscountDto;
      this._billRepository
        .setDiscount(dto)
        .pipe(
          tap(() => this.loadingService.stopLoading('add', 'discount')),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (result) => {
            this._basketService.basketCheckout.next(result.result!);
            this.submittedDiscountCode = this.discountCode.value!;
          },

          error: () => this.loadingService.stopLoading('add', 'discount'),
        });
    }
  }
}
