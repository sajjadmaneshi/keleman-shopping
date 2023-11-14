import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentRepository } from '../../../../../../../shared/data/repositories/comment.repository';
import { AddProductCommentDto } from '../../../../data/models/dto/add-product-comment.dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCommentViewModel } from '../../../../data/models/view-models/product-comment.view-model';
import { Subscription, tap } from 'rxjs';
import { SnackBarService } from '../../../../../../../shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'keleman-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.scss'],
})
export class AddCommentDialogComponent {
  commentForm!: FormGroup;
  isFormSubmitted = false;

  isLoading = false;

  subscription!: Subscription;
  currentRate = 0;

  ratesText = [
    { title: '' },
    { title: 'بد' },
    { title: ' متوسط' },
    { title: ' خوب' },
    { title: 'خیلی خوب' },
    { title: 'عالی' },
  ];

  public get comment(): FormControl {
    return this.commentForm.get('comment') as FormControl;
  }

  constructor(
    private readonly _commentRepository: CommentRepository,
    private readonly _snackBar: SnackBarService,
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productId: number
  ) {
    this._initForm();
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (this.commentForm.valid) {
      this.isLoading = true;
      const dto = {
        productId: this.productId,
        comment: this.comment?.value,
        rate: this.currentRate,
      } as AddProductCommentDto;

      this.subscription = this._commentRepository
        .addProductComment(dto)
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe(
          (result) => this._showSuccessMessage(),
          (error) => {
            this.isLoading = false;
          }
        );
    }
  }

  private _showSuccessMessage() {
    this._snackBar.showWarningSnackBar(
      'نظر شما با موفقیت ثبت گردید و پس از تایید در سایت نمایش داده خواهد شد.'
    );

    this.commentForm.reset();
    this.isFormSubmitted = false;
    this.dialogRef.close();
  }

  private _initForm() {
    this.commentForm = new FormGroup<any>({
      comment: new FormControl('', Validators.required),
    });
  }
}
