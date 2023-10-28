import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../../../../layout/pages/products/data/models/view-models/product.view-model';
import { TextWithIconComponent } from '../../../../shared/components/text-with-icon/text-with-icon.component';
import { NgIf } from '@angular/common';
import { LazyLoadingDirective } from '../../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../../shared/directives/empty-image.directive';
import { RouterLink } from '@angular/router';
import { PriceComponent } from '../../../../shared/components/price/price.component';

@Component({
  selector: 'keleman-background-swiper-item',
  templateUrl: './background-swiper-item.component.html',
  styleUrls: ['./background-swiper-item.component.scss'],
  imports: [
    TextWithIconComponent,
    NgIf,
    LazyLoadingDirective,
    EmptyImageDirective,
    RouterLink,
    PriceComponent,
  ],
  standalone: true,
})
export class BackgroundSwiperItemComponent {
  @Input() product!: ProductViewModel;
}
