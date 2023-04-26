import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FaqModel } from './data/model/faq.model';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { FaqListDialogComponent } from './faq-list-dialog/faq-list-dialog.component';
@Component({
  selector: 'keleman-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FAQComponent {
  isLoading = new BehaviorSubject(false);

  slides: FaqModel[] = [
    {
      id: 1,
      questioner: 'سجاد منشی',
      question:
        'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-01-01T13:34:45',
      answer: {
        date: '2022-01-01T13:34:45',
        text: 'ممنون از سوال خوبتون',
      },
    },
    {
      id: 2,
      questioner: 'سجاد منشی',
      question: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2023-01-01T13:34:45',
    },
    {
      id: 3,
      questioner: 'سجاد منشی',
      question: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      id: 4,
      questioner: 'سجاد منشی',
      question: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      id: 5,
      questioner: 'سجاد منشی',
      question: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      id: 6,
      questioner: 'سجاد منشی',
      question: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      id: 7,
      questioner: 'سجاد منشی',
      question: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
    {
      id: 8,
      questioner: 'سجاد منشی',

      question: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
    },
  ];

  constructor(private _dialog: MatDialog) {}

  openAddQuestionDialog() {
    this._dialog.open(AddQuestionDialogComponent, {
      width: '700px',
      panelClass: 'custom-mat-dialog',
      autoFocus: false,
    });
  }

  openAllQuestionsDialog() {
    this._dialog.open(FaqListDialogComponent, {
      width: '700px',
      data: this.slides,
      panelClass: 'custom-mat-dialog',
    });
  }
}
