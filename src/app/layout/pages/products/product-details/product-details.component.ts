import { Component, HostListener } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { ProductDetailViewModel } from '../data/models/view-models/product-detail.view-model';
import { ProductRepository } from '../data/repositories/product.repository';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productDetails!: ProductDetailViewModel;

  isLoading = false;
  constructor(
    public applicationState: ApplicationStateService,
    private _activatedRoute: ActivatedRoute,
    private _productRepository: ProductRepository
  ) {
    this._getDataFromUrl();
  }

  private _getDataFromUrl(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._getProductDetails(params['url']);
    });
  }

  private _getProductDetails(url: string) {
    this.isLoading = true;
    this._productRepository
      .getProductDetails(url)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.productDetails = result.result!;
      });
  }

  @HostListener('mousewheel', ['$event'])
  onScroll() {
    const productDetailsNavbar = document.querySelector(
      '.product-details-navbar'
    )!;

    (productDetailsNavbar as HTMLElement).offsetTop > 700
      ? productDetailsNavbar.classList.add('add-shadow')
      : productDetailsNavbar.classList.remove('add-shadow');
  }
}
