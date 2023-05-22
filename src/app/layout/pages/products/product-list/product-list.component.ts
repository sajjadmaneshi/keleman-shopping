import { Component } from '@angular/core';
import { ProductRepository } from '../data/repositories/product.repository';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { Subscription } from 'rxjs';
import { ParamMap } from '../../../../shared/services/data.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'keleman-product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductRepository],
})
export class ProductListComponent {
  page = 1;
  products: ProductViewModel[] = [];

  subscription = new Subscription();
  constructor(private _repository: ProductRepository) {
    this.getAllProducts(1);
  }
  throttle = 500;
  scrollDistance = 1;

  getAllProducts(page: number) {
    const params: ParamMap[] = [
      { param: '_page', value: page.toString() },
      { param: '_limit', value: '5' },
    ];
    this._repository.getAll(params).subscribe((value) => {
      this.products = [...this.products, ...value];
    });
  }

  pageChange($event: number) {
    this.getAllProducts($event);
  }
}
