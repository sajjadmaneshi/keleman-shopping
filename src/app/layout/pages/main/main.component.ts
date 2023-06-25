import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductCategoryViewModel } from '../../../shared/models/view-models/product-category.view-model';
import { ProductCategoryService } from './components/product-category/product-category.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private _categoryService: ProductCategoryService) {}
  navigateToPage($event: ProductCategoryViewModel) {
    this._categoryService.onNavigate({ c1: $event.url });
  }
}
