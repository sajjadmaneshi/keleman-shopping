import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../../../../../../mat-components.module';
import { BrandFilterItemsComponent } from '../../shared/brand-filter-items/brand-filter-items.component';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.scss'],
})
export class BrandFilterComponent {
  selectedArray: any[] = [];
  constructor(private _productFilterService: ProductFilterService) {}
  selectionChange($event: any) {
    this.selectedArray = this._productFilterService.manageSelectedArray(
      $event,
      this.selectedArray
    );
    this._productFilterService.filterList.brands = [
      ...(this.selectedArray as [{ id: number; title: string }]),
    ];
  }
}
