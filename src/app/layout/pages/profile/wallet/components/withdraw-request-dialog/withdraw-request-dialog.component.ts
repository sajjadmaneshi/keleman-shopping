import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileRepository } from '../../../data/profile.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { WithdrawRequestDto } from '../../../data/dto/withdraw-request.dto';
import { SnackBarService } from '../../../../../../shared/components/snack-bar/snack-bar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '../../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-withdraw-request-dialog',
  templateUrl: './withdraw-request-dialog.component.html',
  styleUrls: ['./withdraw-request-dialog.component.scss'],
})
export class WithdrawRequestDialogComponent implements OnDestroy {
  withdrawRequestForm!: FormGroup;
  isFormSubmitted = false;
  destroy$ = new Subject<void>();
  amountVal = 0;

  constructor(
    private readonly _profileRepository: ProfileRepository,
    private readonly _snackBar: SnackBarService,
    public readonly dialogRef: MatDialogRef<WithdrawRequestDialogComponent>,
    public readonly loadingService: LoadingService
  ) {
    this._initForm();
  }

  public get amount(): FormControl {
    return this.withdrawRequestForm.get('amount') as FormControl;
  }
  public get description(): FormControl {
    return this.withdrawRequestForm.get('description') as FormControl;
  }

  private _initForm() {
    this.withdrawRequestForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      description: new FormControl(''),
    });
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (this.withdrawRequestForm.valid) {
      this.loadingService.startLoading('add', 'withdrawRequest');
      const dto = {
        amount: +this.amount.value,
        description: this.description.value,
      } as WithdrawRequestDto;
      this._profileRepository
        .addWithdrawRequest(dto)
        .pipe(
          tap(() => this.loadingService.stopLoading('add', 'withdrawRequest')),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => this._showSuccessMessage(),
          error: () =>
            this.loadingService.stopLoading('add', 'withdrawRequest'),
        });
    }
  }

  private _showSuccessMessage() {
    this._snackBar.showWarningSnackBar('درخواست برداشت با موفقیت ثبت گردید');
    this.withdrawRequestForm.reset();
    this.isFormSubmitted = false;
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
