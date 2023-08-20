import { Component, HostListener, OnInit } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { ProductDetailViewModel } from '../data/models/view-models/product-detail.view-model';
import { ProductRepository } from '../data/repositories/product.repository';
import { tap } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails!: ProductDetailViewModel;

  isLoading = false;
  constructor(
    public applicationState: ApplicationStateService,
    private _activatedRoute: ActivatedRoute,
    private _productRepository: ProductRepository,
    private _productService: ProductService
  ) {
    this._getDataFromUrl();
  }

  private _getDataFromUrl(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._productService.productUrl = params['url'];
    });
  }

  ngOnInit() {
    this._getProductDetails();
  }

  private _getProductDetails() {
    this.isLoading = true;
    this._productRepository
      .getProductDetails(this._productService.productUrl)
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
