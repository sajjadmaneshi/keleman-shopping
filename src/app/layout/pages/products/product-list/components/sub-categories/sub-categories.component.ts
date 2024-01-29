import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { BaseCategoryComponent } from '../../../../../../shared/components/product-category/base-category.components';

@Component({
  selector: 'keleman-sub-categories',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss',
})
export class SubCategoriesComponent extends BaseCategoryComponent {}
