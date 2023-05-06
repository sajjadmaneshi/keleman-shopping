import { Component, HostListener } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ArticleModel } from '../../../../shared/models/article.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductViewModel } from '../data/models/view-models/product.view-model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productDetails!: ProductViewModel;
  constructor(
    public applicationState: ApplicationStateService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._getDataFromUrl().then(() => {});
  }

  private _getDataFromUrl(): Promise<string> {
    return new Promise((resolve) => {
      this._activatedRoute.params.subscribe((params: Params) => {
        resolve(params['name']);
      });
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
