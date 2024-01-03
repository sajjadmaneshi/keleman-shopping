import { Component, Input } from '@angular/core';
import { FaqViewModel } from '../data/faq.view-model';
import { PersianDateTimeService } from '../../../../../../../shared/services/date-time/persian-datetime.service';

@Component({
  selector: 'keleman-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
})
export class FaqItemComponent {
  @Input() faq!: FaqViewModel;

  constructor(public persianDateTime: PersianDateTimeService) {}
}
