import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'keleman-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.scss'],
})
export class AddQuestionDialogComponent {
  question = new FormControl('', Validators.required);
}
