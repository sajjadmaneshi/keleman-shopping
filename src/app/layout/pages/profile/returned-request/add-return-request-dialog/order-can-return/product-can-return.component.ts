import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyLoadingDirective } from '../../../../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../../../../shared/directives/empty-image.directive';
import { MatIconModule } from '@angular/material/icon';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { ReturnOrderProductViewModel } from '../../../data/view-models/order-can-return.view-model';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'keleman-product-can-return',
  standalone: true,
  imports: [
    LazyLoadingDirective,
    EmptyImageDirective,
    MatIconModule,
    NgbTooltip,
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
    MatListModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './product-can-return.component.html',
})
export class ProductCanReturnComponent {
  @Input() product!: ReturnOrderProductViewModel;

  @Output('addTo') addToReturnOrderList =
    new EventEmitter<ReturnOrderProductViewModel>();
  checked = false;

  constructor(public persianDateTimeService: PersianDateTimeService) {}

  addToReturnList() {
    this.addToReturnOrderList.emit(this.product);
  }
}
