import { Component, Input } from '@angular/core';
import { ProductItemModel } from '../../../../shared/models/product-item.model';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ProductItemMobileComponent } from '../../mobile/product-item-mobile/product-item-mobile.component';
import { SwiperProductItemWebComponent } from '../../web/swiper-product-item-web/swiper-product-item-web.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'swiper-item',
  templateUrl: './swiper-item.component.html',
  styleUrls: ['./swiper-item.component.scss'],
  imports: [
    ProductItemMobileComponent,
    SwiperProductItemWebComponent,
    CommonModule,
  ],
  standalone: true,
})
export class SwiperItemComponent {
  @Input() product!: ProductItemModel;
  constructor(public applicationStateService: ApplicationStateService) {}
}
