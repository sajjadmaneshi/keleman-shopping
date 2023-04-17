import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../../../../../../../../mat-components.module';
import { SellerFilterItemsComponent } from '../../shared/seller-filter-items/seller-filter-items.component';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-seller-filter',
  templateUrl: './seller-filter.component.html',
  styleUrls: ['./seller-filter.component.scss'],
})
export class SellerFilterComponent {
  selectedArray: any[] = [];
  constructor(private _productFilterService: ProductFilterService) {}
  selectionChange($event: any) {
    this.selectedArray = this._productFilterService.manageSelectedArray(
      $event,
      this.selectedArray
    );
    this._productFilterService.filterList.sellers = [
      ...(this.selectedArray as [{ id: number; title: string }]),
    ];
  }
}
