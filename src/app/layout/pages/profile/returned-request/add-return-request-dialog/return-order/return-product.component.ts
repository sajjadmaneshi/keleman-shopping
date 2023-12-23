import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmptyImageDirective } from '../../../../../../shared/directives/empty-image.directive';
import { LazyLoadingDirective } from '../../../../../../shared/directives/lazy-loading.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
} from '@ng-bootstrap/ng-bootstrap';
import { ReturnOrderProductViewModel } from '../../../data/view-models/order-CanReturn.view-model';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { FormsModule } from '@angular/forms';
import { ValueChangerComponent } from '../../../../../../shared/components/value-changer/value-changer.component';

@Component({
  selector: 'keleman-return-order',
  standalone: true,
  imports: [
    EmptyImageDirective,
    LazyLoadingDirective,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
    FormsModule,
    ValueChangerComponent,
  ],
  templateUrl: './return-order.component.html',
  styleUrl: './return-order.component.scss',
})
export class ReturnOrderComponent {
  @Input() product!: ReturnOrderProductViewModel;

  @Output() remove = new EventEmitter<number>();

  constructor(public persianDateTimeService: PersianDateTimeService) {}

  onRemove() {
    this.remove.emit(this.product.id);
  }

  amountChange($event: number, product: ReturnOrderProductViewModel) {
    product.amount = $event;
  }

  max!: number;
}
