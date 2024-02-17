import {
  Component,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { PaymentGatewayViewModel } from '../data/models/payment-gateway.view-model';
import { UserCreditViewModel } from '../../profile/data/view-models/user-credit.view-model';
import { InitialAppService } from '../../../../shared/services/initial-app.service';
import { LoadingService } from '../../../../../common/services/loading.service';
import { BillRepository } from '../data/repositories/bill.repository';
import { SaveOrderDto } from '../data/dto/save-order.dto';
import { FormControl, Validators } from '@angular/forms';
import { SetDiscountDto } from '../data/dto/set-discount.dto';
import { SnackBarService } from '../../../../shared/components/snack-bar/snack-bar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransferToBankDialogComponent } from './transfer-to-bank-dialog/transfer-to-bank-dialog.component';
import { PayResultViewModel } from '../data/models/pay-result.view-model';
import { DOCUMENT } from '@angular/common';
import { BasketService } from '../services/basket.service';
import { BasketCheckoutViewModel } from '../data/models/basket-checkout.view-model';
import { PaymentEnum } from './payment-gateway/payment.enum';
import { Router } from '@angular/router';
import { AttachReceiptDialogComponent } from './attach-receipt-dilog/attach-receipt-dialog.component';
import { AttachChequeDialogComponent } from './attach-cheque-dialog/attach-cheque-dialog.component';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
  selector: 'keleman-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  paymentGateWays: PaymentGatewayViewModel[] = [];
  userCredit = new UserCreditViewModel(0, 0);
  isFormSubmitted = false;
  submittedDiscountCode: string = '';
  basketCheckout!: BasketCheckoutViewModel;
  discountCode = new FormControl('', Validators.required);
  description = new FormControl('');
  paymentEnums = PaymentEnum;
  selectedPaymentGateway!: PaymentGatewayViewModel;
  selectedStep = 1;
  dialogBaseConfigs = {
    width: '800px',
    autoFocus: false,
    panelClass: 'custom-mat-dialog',
  } as MatDialogConfig;
  constructor(
    private readonly _basketService: BasketService,
    private readonly _initialAppService: InitialAppService,
    private readonly _billRepository: BillRepository,
    private readonly _snackBarService: SnackBarService,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    public applicationState: ApplicationStateService,
    @Inject(DOCUMENT) private document: Document,
    public readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading('read', 'paymentGateway');
    this._basketService.paymentGateways$
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

    this._basketService.payResult$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: PayResultViewModel | undefined) => {
        if (result) this._handleAfterSaveOrder(result);
      });
    this._basketService.basketCheckout$.subscribe((result) => {
      this.basketCheckout = result;
    });
    this._basketService.readyForPay.subscribe((result) => {
      if (result) {
        this.saveOrder();
      }
    });
  }

  openChequeOrReceiptDialog(billId: number, type: AttachmentType) {
    const template = (
      type === AttachmentType.cheque
        ? AttachChequeDialogComponent
        : AttachReceiptDialogComponent
    ) as ComponentType<any>;
    this._dialog
      .open(
        template,
        this.applicationState.isPhone || this.applicationState.isTablet
          ? {
              ...this.dialogBaseConfigs,
              width: '100%',
              height: '100%',
              maxWidth: '100vw',
              data: billId,
            }
          : {
              ...this.dialogBaseConfigs,
              data: billId,
            }
      )
      .afterClosed()
      .subscribe((result: number) => {
        if (result) this._navigateToPaymentResultPage(billId);
      });
  }

  private _handleAfterSaveOrder(payResult: PayResultViewModel) {
    this._dialog.open(TransferToBankDialogComponent);
    if (payResult.url) {
      window.location.href = payResult.url;
      this._dialog.closeAll();
    }
    if (payResult.refId) {
      this._mellatPay(payResult.refId);
      this._dialog.closeAll();
    }
  }

  private _mellatPay(refId: any) {
    var form = this.document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute(
      'action',
      'https://bpm.shaparak.ir/pgwchannel/startpay.mellat'
    );
    form.setAttribute('target', '_self');
    var hiddenField = this.document.createElement('input');
    hiddenField.setAttribute('name', 'RefId');
    hiddenField.setAttribute('value', refId);
    form.appendChild(hiddenField);
    this.document.body.appendChild(form);
    form.submit();
    this.document.body.removeChild(form);
  }

  saveOrder() {
    this.loadingService.startLoading('add', 'saveOrder');
    const dto = {
      discountCode: this.submittedDiscountCode,
      paymentGatewayId: this.selectedPaymentGateway.id,
      description: this.description.value,
      billId: this._basketService.billId.value,
    } as SaveOrderDto;

    this._billRepository
      .save(dto)
      .pipe(
        tap(() => this.loadingService.stopLoading('add', 'saveOrder')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => this._actionsAfterSaveOrder(result.result!),
        error: () => this.loadingService.stopLoading('add', 'saveOrder'),
      });
  }

  private _actionsAfterSaveOrder(billId: number) {
    this._basketService.billId.next(billId);
    this._basketService.billInvoice(this._basketService.billId.value!);
    this._initialAppService.getUserCredit();
    if (
      this.selectedPaymentGateway.enName === this.paymentEnums.WalletPay ||
      this.selectedPaymentGateway.enName === this.paymentEnums.CreditPay
    ) {
      this._navigateToPaymentResultPage(billId);
      return;
    }
    if (this.selectedPaymentGateway.enName === this.paymentEnums.BankCheque) {
      this.openChequeOrReceiptDialog(billId, 0);
      return;
    }
    if (this.selectedPaymentGateway.enName === this.paymentEnums.BankRecipt) {
      this.openChequeOrReceiptDialog(billId, 1);
      return;
    }

    this._basketService.pay(
      this._basketService.billId.value!,
      this.selectedPaymentGateway.id
    );
  }

  private _navigateToPaymentResultPage(billId: number) {
    this._router.navigate(['/callback'], {
      queryParams: { billid: billId, status: 1 },
    });
  }

  selectPaymentGateWay(paymentGateway: PaymentGatewayViewModel) {
    this.selectedPaymentGateway = paymentGateway;
    this._basketService.selectedPaymentGateWay.next(paymentGateway.id);
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
            this._basketService.basketCheckout$.next(result.result!);
            this.submittedDiscountCode = this.discountCode.value!;
            this._showSuccessMessage('کدتخفیف شما با موفقیت اعمال شد');
          },
          error: () => this.loadingService.stopLoading('add', 'discount'),
        });
    }
  }

  private _showSuccessMessage(message: string) {
    this._snackBarService.showPrimarySnackBar(message);
  }

  changeStep() {
    this.selectedStep++;
  }

  submitPay() {
    this._basketService.readyForPay.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export enum AttachmentType {
  cheque,
  receipt,
}
