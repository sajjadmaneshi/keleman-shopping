import { Component, EventEmitter, Output } from '@angular/core';
import { InitialAppService } from '../../../../../../shared/services/initial-app.service';
import { ProductCategoryViewModel } from '../../../../../../shared/models/view-models/product-category.view-model';
import { ProductCategoryService } from '../../../../../pages/main/components/product-category/product-category.service';

@Component({
  selector: 'keleman-off-canvas-menu',
  templateUrl: './off-canvas-menu.component.html',
  styleUrls: ['./off-canvas-menu.component.scss'],
})
export class OffCanvasMenuComponent {
  @Output() close = new EventEmitter();
  productCategories!: ProductCategoryViewModel[];

  constructor(
    private _initialAppService: InitialAppService,
    private _categoryService: ProductCategoryService
  ) {
    this.productCategories = _initialAppService.productCategories!;
  }

  onClose() {
    this.close.emit();
  }

  onNavigate($event: { c1?: string; c2?: string; c3?: string }) {
    this._categoryService.onNavigate($event);
    this.onClose();
  }
}
