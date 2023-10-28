import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductDetailViewModel } from '../data/models/view-models/product-detail.view-model';
import { ProductRepository } from '../data/repositories/product.repository';
import { tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { DOCUMENT } from '@angular/common';
import { AvailableStatusEnum } from '../data/enums/available-status.enum';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails!: ProductDetailViewModel;
  isLoading = false;
  productStatus: AvailableStatusEnum = AvailableStatusEnum.AVAILABLE;
  availableStatusEnum = AvailableStatusEnum;
  constructor(
    public applicationState: ApplicationStateService,
    private _activatedRoute: ActivatedRoute,
    private _productRepository: ProductRepository,
    private _productService: ProductService,
    @Inject(DOCUMENT) private document: Document
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
    this._productService.getRelatedProducts();
  }

  private _getProductDetails() {
    this.isLoading = true;
    this._productRepository
      .getProductDetails(this._productService.productUrl)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.productDetails = result.result!;
        this.productStatus = this._productService.getProductStatus(
          this.productDetails
        );
      });
  }

  @HostListener('mousewheel', ['$event'])
  onScroll() {
    const productDetailsNavbar = this.document.querySelector(
      '.product-details-navbar'
    )!;

    (productDetailsNavbar as HTMLElement).offsetTop > 700
      ? productDetailsNavbar.classList.add('add-shadow')
      : productDetailsNavbar.classList.remove('add-shadow');
  }
}
