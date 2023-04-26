import { Component, Input } from '@angular/core';
import { FaqModel } from '../data/model/faq.model';
import { PersianDateTimeService } from '../../../../../../../shared/services/date-time/persian-datetime.service';

@Component({
  selector: 'keleman-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
})
export class FaqItemComponent {
  @Input() faq!: FaqModel;

  constructor(public persianDateTime: PersianDateTimeService) {}
}
