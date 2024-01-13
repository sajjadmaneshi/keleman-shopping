import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SellerViewModel } from './seller.view-model';
import { PriceComponent } from '../../../../../../shared/components/price/price.component';
import { ValueChangerComponent } from '../../../../../../shared/components/value-changer/value-changer.component';
import { AsyncPipe } from '@angular/common';
import { LoadingProgressDirective } from '../../../../../../shared/directives/loading-progress.directive';
import { LoadingService } from '../../../../../../../common/services/loading.service';
import { Subject } from 'rxjs';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'keleman-stores',
  standalone: true,
  imports: [
    PriceComponent,
    ValueChangerComponent,
    AsyncPipe,
    LoadingProgressDirective,
  ],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
})
export class StoresComponent {
  @Input() productId!: number;
  @Output() addToBasket = new EventEmitter<SellerViewModel>();
  @Output() updateBasket = new EventEmitter<{
    seller: SellerViewModel;
    count: number;
  }>();
  $destroy = new Subject<void>();
  sellers: SellerViewModel[] = [];

  constructor(
    public loadingService: LoadingService,
    private _productService: ProductService
  ) {
    this._productService.sellers$.subscribe((result) => {
      this.sellers = result;
    });
  }

  onAdd(seller: SellerViewModel) {
    this.addToBasket.emit(seller);
  }
  onUpdate(seller: SellerViewModel, count: number) {
    this.updateBasket.emit({
      seller,
      count,
    });
  }
}