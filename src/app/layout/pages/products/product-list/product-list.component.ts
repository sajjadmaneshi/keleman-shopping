import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductRepository } from '../data/repositories/product.repository';
import { HttpClientResult } from '../../../../shared/models/http/http-client.result';
import { SharedVariablesService } from '../../../../shared/services/shared-variables.service';

@Component({
  selector: 'keleman-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  totalElements = 0;
  page = 1;

  products: ProductViewModel[] = [];

  subscription = new Subscription();
  constructor(
    private _activeRoute: ActivatedRoute,
    private _productsRepository: ProductRepository,
    public sharedVaribaleServie: SharedVariablesService
  ) {}
  throttle = 500;
  scrollDistance = 1;
  categoryUrl!: string;
  private _getParamsFromUrl() {
    this._activeRoute.params.subscribe((params: Params) => {
      this.products = [];
      const urlParams = ['catUrl1', 'catUrl2', 'catUrl3'];

      for (const param of urlParams) {
        if (params[param]) {
          this.categoryUrl = params[param];
          break;
        }
      }
      this.getAllProducts(0);
    });
  }

  ngOnInit(): void {
    this.products = [];
    this._getParamsFromUrl();
  }

  getAllProducts(page: number) {
    this._productsRepository.search(this.categoryUrl, page, 10).subscribe(
      (
        result: HttpClientResult<{
          products: ProductViewModel[];
          totalElements: number;
        }>
      ) => {
        this.products = [...result.result?.products!];
        this.totalElements = result.result?.totalElements!;
      }
    );
  }

  pageChange($event: number) {
    this.page = $event;
    this.getAllProducts($event);
  }
}
