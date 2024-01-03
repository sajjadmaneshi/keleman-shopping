import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FaqRepository } from '../data/faq.repository';
import { Subscription, tap } from 'rxjs';
import { SnackBarService } from '../../../../../../../shared/components/snack-bar/snack-bar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FaqDto } from '../data/faq.dto';

@Component({
  selector: 'keleman-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  providers: [FaqRepository],
})
export class AddQuestionDialogComponent implements OnDestroy {
  isFormSubmitted = false;
  isLoading = false;
  question = new FormControl('', Validators.required);

  subscription!: Subscription;

  constructor(
    private readonly _faqRepository: FaqRepository,
    private readonly _snackBar: SnackBarService,
    public dialogRef: MatDialogRef<AddQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productId: number
  ) {}

  submitQuetion() {
    this.isFormSubmitted = true;
    if (this.question.valid) {
      this.isLoading = true;
      const dto = {
        id: this.productId,
        text: this.question.value,
      } as FaqDto;
      this.subscription = this._faqRepository
        .addQuestion(dto)
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe({
          next: () => this._showSuccessMessage(),
          error: () => (this.isLoading = false),
        });
    }
  }
  private _showSuccessMessage() {
    this._snackBar.showWarningSnackBar('پرسش شما با موفقیت ثبت گردید ');
    this.isFormSubmitted = false;
    this.question.reset();
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
