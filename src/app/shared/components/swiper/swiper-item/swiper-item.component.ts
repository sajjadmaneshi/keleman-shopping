import { Component, Input } from '@angular/core';

import { ApplicationStateService } from '../../../services/application-state.service';
import { CommonModule } from '@angular/common';
import { PriceComponent } from '../../price/price.component';
import { ProductViewModel } from '../../../../layout/pages/products/data/models/view-models/product.view-model';
import { SymbolDirective } from '../../../directives/symbol.directive';

@Component({
  selector: 'swiper-item',
  templateUrl: './swiper-item.component.html',
  styleUrls: ['./swiper-item.component.scss'],
  imports: [CommonModule, PriceComponent, SymbolDirective],
  standalone: true,
})
export class SwiperItemComponent {
  @Input() product!: ProductViewModel;
  constructor(public applicationStateService: ApplicationStateService) {}
}
