import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'keleman-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.scss'],
})
export class AddCommentDialogComponent {
  commentForm!: FormGroup;

  ratesText = [
    { title: 'خیلی بد' },
    { title: ' بد' },
    { title: ' متوسط' },
    { title: ' خوب' },
    { title: 'خیلی خوب' },
    { title: 'عالی' },
  ];
  selected = false;

  public get rate(): FormControl {
    return this.commentForm.get('rate') as FormControl;
  }
  public get satisfaction(): FormControl {
    return this.commentForm.get('satisfaction') as FormControl;
  }

  get title(): FormControl | null {
    return this.commentForm.get('commentDetails')?.get('title') as FormControl;
  }

  public get text(): FormControl | null {
    return this.commentForm.get('commentDetails')?.get('text') as FormControl;
  }

  constructor() {
    this._initForm();
  }

  private _initForm() {
    this.commentForm = new FormGroup<any>({
      rate: new FormControl(0),
      satisfaction: new FormControl(null, Validators.required),
      commentDetails: new FormGroup({
        title: new FormControl('', Validators.required),
        text: new FormControl('', Validators.required),
      }),
    });
  }
}
