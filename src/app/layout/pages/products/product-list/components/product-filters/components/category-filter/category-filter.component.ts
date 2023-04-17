import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../../../../../../mat-components.module';
import { CategoryFilterItemsComponent } from '../../shared/category-filter-items/category-filter-items.component';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  selectedArray: any[] = [];
  constructor(private _productFilterService: ProductFilterService) {}
  selectionChange($event: any) {
    this.selectedArray = this._productFilterService.manageSelectedArray(
      $event,
      this.selectedArray
    );
    this._productFilterService.filterList.categories = [
      ...(this.selectedArray as [{ id: number; title: string }]),
    ];
  }
}
