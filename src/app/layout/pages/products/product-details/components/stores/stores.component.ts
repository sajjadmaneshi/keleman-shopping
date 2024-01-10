import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SellerViewModel } from './seller.view-model';
import { PriceComponent } from '../../../../../../shared/components/price/price.component';
import { ValueChangerComponent } from '../../../../../../shared/components/value-changer/value-changer.component';
import { AsyncPipe } from '@angular/common';
import { LoadingProgressDirective } from '../../../../../../shared/directives/loading-progress.directive';
import { LoadingService } from '../../../../../../../common/services/loading.service';
import { BasketRepository } from '../../../../checkout/data/repositories/basket.repository';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';

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
export class StoresComponent implements OnInit {
  @Input() sellers: SellerViewModel[] = [];
  @Input() productId!: number;
  @Output() addToBasket = new EventEmitter<number>();
  @Output() updateBasket = new EventEmitter<{
    sellerId: number;
    count: number;
  }>();
  $destroy = new Subject<void>();

  constructor(
    public loadingService: LoadingService,
    private _basketRepository: BasketRepository
  ) {}

  ngOnInit(): void {
    if (this.productId) {
      this.sellers.forEach((x) => {
        this.getInBasketCount(x.id).then((y) => {
          console.log(y);
          x.inBasketCount = y;
        });
      });
    }
  }

  onAdd(sellerId: number) {
    this.addToBasket.emit(sellerId);
  }
  onUpdate(sellerId: number, count: number) {
    this.updateBasket.emit({ sellerId, count });
  }

  async getInBasketCount(storeId: number): Promise<number> {
    try {
      const result = await lastValueFrom(
        this._basketRepository
          .isInCart(this.productId, storeId)
          .pipe(takeUntil(this.$destroy))
      );

      return result.result!;
    } catch (error) {
      throw error;
    }
  }
}
