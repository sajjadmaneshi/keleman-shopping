import { Component } from '@angular/core';

import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { ProductItemModel } from '../../../../../../shared/models/product-item.model';
import { CategoryModel } from '../../../../../../shared/models/category.model';

@Component({
  selector: 'keleman-product-category',
  templateUrl: './keleman-product-category.component.html',
  styleUrls: ['./keleman-product-category.component.scss'],
})
export class KelemanProductCategoryComponent {
  constructor(public applicationStateService: ApplicationStateService) {}
}
