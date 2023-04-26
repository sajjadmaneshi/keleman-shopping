import { Component } from '@angular/core';
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
