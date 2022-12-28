import { Component } from '@angular/core';

import { ResponsiveService } from '../../../../../../shared/services/responsive.service';

@Component({
  selector: 'app-product-category-swiper',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent {
  constructor(public responsiveService: ResponsiveService) {}
}
