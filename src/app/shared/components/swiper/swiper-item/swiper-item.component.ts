import { Component, Input } from '@angular/core';
import { ProductItemModel } from '../../../models/product-item.model';
import { ApplicationStateService } from '../../../services/application-state.service';
import { CommonModule } from '@angular/common';
import { PriceComponent } from '../../price/price.component';

@Component({
  selector: 'swiper-item',
  templateUrl: './swiper-item.component.html',
  styleUrls: ['./swiper-item.component.scss'],
  imports: [CommonModule, PriceComponent],
  standalone: true,
})
export class SwiperItemComponent {
  @Input() product!: ProductItemModel;
  constructor(public applicationStateService: ApplicationStateService) {}
}
