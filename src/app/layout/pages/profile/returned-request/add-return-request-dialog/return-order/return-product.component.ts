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
import { ReturnOrderProductViewModel } from '../../../data/view-models/order-can-return.view-model';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValueChangerComponent } from '../../../../../../shared/components/value-changer/value-changer.component';
import { JsonPipe } from '@angular/common';
import { AutoCompleteComponent } from '../../../../../../shared/components/auto-complete/auto-complete.component';

@Component({
  selector: 'keleman-return-product',
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
    JsonPipe,
    ReactiveFormsModule,
    AutoCompleteComponent,
  ],
  templateUrl: './return-product.component.html',
  styleUrl: './return-product.component.scss',
})
export class ReturnProductComponent implements OnInit {
  @Input() product!: ReturnOrderProductViewModel;
  @Output() remove = new EventEmitter<number>();

  constructor(public persianDateTimeService: PersianDateTimeService) {}

  ngOnInit(): void {
    if (this.product) this.max = this.product.amount;
  }

  onRemove() {
    this.remove.emit(this.product.id);
  }

  amountChange($event: number) {
    this.product.amount = $event;
  }

  max!: number;
}
