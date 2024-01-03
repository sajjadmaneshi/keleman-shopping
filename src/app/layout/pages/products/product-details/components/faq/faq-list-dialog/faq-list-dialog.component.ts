import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersianDateTimeService } from '../../../../../../../shared/services/date-time/persian-datetime.service';
import { FaqViewModel } from '../data/faq.view-model';

@Component({
  selector: 'keleman-faq-list-dialog',
  templateUrl: './faq-list-dialog.component.html',
  styleUrls: ['./faq-list-dialog.component.scss'],
})
export class FaqListDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FaqViewModel[],
    public persianDateTime: PersianDateTimeService
  ) {}
}
