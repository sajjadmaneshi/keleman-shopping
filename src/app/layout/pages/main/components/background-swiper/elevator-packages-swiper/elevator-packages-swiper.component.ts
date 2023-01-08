import { Component } from '@angular/core';
import { ProductViewModel } from '../amazing-offer-swiper/data/models/product.view-model';
import { AmazingOfferRepository } from '../amazing-offer-swiper/data/amazing-offer.repository';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'keleman-elevator-packages-swiper',
  templateUrl: './elevator-packages-swiper.component.html',
  styleUrls: ['./elevator-packages-swiper.component.scss'],
  providers: [AmazingOfferRepository],
})
export class ElevatorPackagesSwiperComponent {
  slides: ProductViewModel[] = [];
  isLoading = new BehaviorSubject(false);
  constructor(private _productRepository: AmazingOfferRepository) {
    this._getProducts();
  }
  private _getProducts() {
    this.isLoading.next(true);
    this._productRepository.getAll().subscribe((res) => {
      this.slides = res;
      setTimeout(() => this.isLoading.next(false), 1500);
    });
  }
}
