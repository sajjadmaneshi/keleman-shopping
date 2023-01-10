import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AmazingOfferRepository } from './data/amazing-offer.repository';
import { ProductViewModel } from './data/models/product.view-model';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-amazing-offer-swiper',
  templateUrl: './amazing-offer-swiper.component.html',
  styleUrls: ['./amazing-offer-swiper.component.scss'],
  providers: [AmazingOfferRepository],
})
export class AmazingOfferSwiperComponent {
  isLoading = new BehaviorSubject(false);
  slides: ProductViewModel[] = [];
  constructor(
    private _responsive: BreakpointObserver,
    private _productRepository: AmazingOfferRepository
  ) {
    this._getProducts();
  }

  private _getProducts() {
    this.isLoading.next(true);
    this._productRepository.getAll().subscribe((res) => {
      this.slides = res;
      this.isLoading.next(false);
    });
  }
}
